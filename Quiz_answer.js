let img; // 회전시킬 이미지
let angle = 12; // 회전 각도
let lim= 180; // 이진화 임계값 설정
function preload() {
  img = loadImage('test.png');
}

function setup() {
  createCanvas(500, 500);
  imageMode(CENTER);
}

function draw() {
  translate(width / 2, height / 2); // 회전 중심을 캔버스 중앙으로 이동
  rotateImage(img, angle);
}

function rotateImage(img, a) {
  // 수학적 회전 공식을 적용하기 위해 행렬 변환 사용
  let c = cos(radians(a));
  let s = sin(radians(a));
  applyMatrix(c, -s, s, c, 0, 0); // 회전 행렬을 적용
  // 이미지 그리기
  image(img, 0, 0);
  loadPixels();

  // 각 픽셀을 순회하면서 이진화를 수행
  for (let i = 0; i < pixels.length; i += 4) {
    let r = pixels[i];
    let g = pixels[i + 1];
    let b = pixels[i + 2];

    // 픽셀 값을 그레이스케일로 변환
    let gray = (r + g + b) / 3;
    let threshold = lim;

    // 이진화
    if (gray > threshold) {
      pixels[i] = 255; // 흰색
      pixels[i + 1] = 255;
      pixels[i + 2] = 255;
    } else {
      pixels[i] = 0; // 검은색
      pixels[i + 1] = 0;
      pixels[i + 2] = 0;
    }
  }
  updatePixels();
  resetMatrix();
}