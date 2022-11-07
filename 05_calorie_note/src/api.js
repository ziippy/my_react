export async function getFoods(order) {
    // https://learn.codeit.kr/api/foods 에서 api 대신 전화번호 뒷자리 사용을 권장
    const query = `?order=${order}`;
    const response = await fetch("https://learn.codeit.kr/3608/foods" + query);
    const body = await response.json();
    return body;
}
