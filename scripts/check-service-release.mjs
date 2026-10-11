import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import ts from 'typescript';
const require = createRequire(import.meta.url);
function load(file, stubs = {}) {
  const exports = {};
  const js = ts.transpileModule(fs.readFileSync(file, 'utf8'), {compilerOptions: {module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022}}).outputText;
  vm.runInNewContext(js, {exports, require: name => name in stubs ? stubs[name] : require(name), console, URLSearchParams, Response});
  return exports;
}
const {serviceContent, serviceExamples, resolveContactContext, contactHref} = load('src/content/services.ts');
assert.equal(serviceContent.length, 5);
assert.equal(serviceExamples.length, 15);
assert.equal(new Set(serviceExamples.map(e=>e.id)).size, 15);
for (const service of serviceContent) {
  assert.equal(serviceExamples.filter(e=>e.serviceSlug === service.slug).length, 3);
  assert.ok(fs.existsSync(`src/app/services/${service.slug}/page.tsx`));
}
for (const example of serviceExamples) {
  assert.equal(example.origin, 'client', 'Owner confirmed all 15 projects are real client work with changed names');
  assert.equal(example.permissionToNameClient, false, 'Protected client identities must not be disclosed');
  assert.ok(example.caseUrl.endsWith('#'+example.id));
  assert.ok(example.limitations && example.exactContribution && example.lastVerifiedAt);
  assert.equal(example.outcomes.length, 0, 'No unsupported commercial metrics');
  const context = resolveContactContext(new URL('https://example.test'+contactHref(example.serviceSlug, example.id)).search);
  assert.equal(context.example.id, example.id);
  if (example.previewImage) assert.ok(fs.existsSync('public'+example.previewImage));
}
assert.equal(resolveContactContext('?service=<script>'), null);
assert.equal(resolveContactContext('?service=integrations-apis&example=medicore').example, undefined);
assert.equal(serviceExamples.filter(e=>e.sandbox).length, 3);
const {processPayment} = load('src/components/service-examples/WorkflowSandbox.tsx');
const failed = processPayment([], true);
assert.equal(failed.processed.length, 0);
const success = processPayment(failed.processed, false);
assert.equal(success.processed.length, 1);
assert.equal(processPayment(success.processed, false).processed.length, 1);
assert.match(processPayment(success.processed, true).status, /Duplicate ignored/);

let calls = 0, adminAccepted = true, throwProvider = false, renderFails = false;
const {POST} = load('src/app/api/contact/route.ts', {
  'next/server': {NextResponse: {json: (body, options) => Response.json(body, options)}},
  '@react-email/render': {render: async () => {if(renderFails) throw Error('Mock render failure'); return '<p>Controlled test</p>'; }},
  '@/emails/templates/ContactAdminEmail': {default:()=>null},
  '@/emails/templates/ContactCustomerEmail': {default:()=>null},
  '@/lib/email': {FROM:{}, ADMIN:{}, generateRefId:()=> 'TEST-ONLY', formatTimestamp:()=> 'test', generatePlainText:()=> 'test', sendEmailPair:async()=> {calls++; if(throwProvider) throw Error('Mock outage'); return {admin:{ok:adminAccepted},customer:{ok:true}};}},
});
const valid = {name:'QA Example',email:'qa@example.test',message:'Controlled test with no real email delivery.'};
const post = body => POST({json:async()=>body});
assert.equal((await post({})).status, 422);
assert.equal((await POST({json:async()=>{throw Error('bad json');}})).status, 400);
assert.equal((await post({...valid, message:'x'.repeat(12001)})).status, 422);
assert.equal((await (await post({...valid,company:'spam'})).json()).id, 'bot');
assert.equal(calls, 0);
let response = await post(valid);
assert.equal(response.status, 200);
assert.equal((await response.json()).status, 'accepted');
adminAccepted = false;
assert.equal((await post(valid)).status, 500);
throwProvider = true;
assert.equal((await post(valid)).status, 500);
renderFails = true;
assert.equal((await post(valid)).status, 500);
console.log('PASS: 5 routes, 15 examples, safe contextual links, 3-sandbox limit, payment failure/retry/duplicate, and contact validation/acceptance/provider/render failure. No network requests or real messages.');
if(process.argv.includes('--http')) {
  const base='http://127.0.0.1:3012';
  for(const path of [...serviceContent.map(s=>'/services/'+s.slug),'/services','/what-we-build','/contact','/elowen-living','/elowen-living/properties','/elowen-living/agents','/elowen-living/sell-with-us']) {
    const response=await fetch(base+path);
    assert.equal(response.status,200,path);
    const html=await response.text();
    for(const example of serviceExamples.filter(e=>'/services/'+e.serviceSlug===path)) assert.ok(html.includes(`id="${example.id}"`),example.id);
    console.log('HTTP 200',path);
  }
  const redirect=await fetch(base+'/projects',{redirect:'manual'});
  assert.ok([307,308].includes(redirect.status));
  assert.equal(redirect.headers.get('location'),'/what-we-build');
  console.log('PASS: /projects redirects to /what-we-build');
}
