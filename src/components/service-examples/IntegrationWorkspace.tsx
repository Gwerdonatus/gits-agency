"use client";
import ConnectedProduct from "./ConnectedProduct";
export function ZovaDemo() {
  return <ConnectedProduct kind="payment" />;
}
export function SwiftHaulDemo() {
  return <ConnectedProduct kind="logistics" />;
}
export function PulseClinicDemo() {
  return <ConnectedProduct kind="booking" />;
}
export default ConnectedProduct;
