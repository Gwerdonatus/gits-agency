import { NextResponse } from 'next/server';

export async function GET() {
  const endpoint = "https://api.indexnow.org/indexnow";
  
  const payload = {
    host: "www.gits.technology",
    key: "4a980050f4bb4a24829ebaadbbca8bcc",
    keyLocation: "https://www.gits.technology/4a980050f4bb4a24829ebaadbbca8bcc.txt",
    urlList: [
      "https://www.gits.technology/",
      "https://www.gits.technology/services",
      "https://www.gits.technology/services/websites-digital-experiences",
      "https://www.gits.technology/services/whatsapp-ai-agents",
       "https://www.gits.technology/services/custom-software-development",
      "https://www.gits.technology/contact"
    ]
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      return NextResponse.json({ success: true, message: "IndexNow pinged successfully!" });
    }
    
    return NextResponse.json({ success: false, status: response.status }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}