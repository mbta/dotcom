export default function () {
  let retries = 3;

  setInterval(() => {
    if (retries > 0) {
      const iframe = document.getElementById('juxtapose');

      if (iframe) {
        iframe.src += '';

        clearInterval(this);
      }
    } else {
      clearInterval(this);
    }

    retries--;
  }, 500);
}