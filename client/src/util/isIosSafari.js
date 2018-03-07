export default function isIosSafari() {
  const userAgent = window.navigator.userAgent.toLowerCase();
  return (
    (userAgent.indexOf('safari') !== -1) &&
    (userAgent.indexOf('ios') !== -1)
  );
}