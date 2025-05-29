export default function () {
  const iframe = document.getElementById('juxtapose');

  if (!iframe) {
    return;
  }

  setTimeout(() => {
    iframe.src += '';
  }, 1000);
}