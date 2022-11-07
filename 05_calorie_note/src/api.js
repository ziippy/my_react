export async function getFoods() {
  // https://learn.codeit.kr/api/foods 에서 api 대신 전화번호 뒷자리 사용을 권장
  const response = await fetch("https://learn.codeit.kr/3608/foods");
  const body = await response.json();
  return body;
}
