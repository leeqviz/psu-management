export function getMatrixEffect() {
  const canvas = document.getElementById(
    "matrix-effect"
  ) as HTMLCanvasElement | null;
  if (!canvas) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const context = canvas.getContext("2d");
  if (!context) return;

  const alphabet =
    "0123456789" +
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
    "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン";
  const fontSize = 16;
  context.font = fontSize + "pt monospace";
  const columns = Math.floor(canvas.width / fontSize);
  const rainDrops: number[] = Array(columns).fill(canvas.height);

  return () => {
    context.fillStyle = "rgba(0, 0, 0, 0.05)";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "#0F0";
    for (let i = 0; i < rainDrops.length; i++) {
      const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
      context.fillText(text, i * fontSize, rainDrops[i] * fontSize);

      if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.9)
        rainDrops[i] = 0;

      rainDrops[i]++;
    }
  };
}
