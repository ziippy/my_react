export async function getFoods({ order, cursor, limit }) {
    // https://learn.codeit.kr/api/foods 에서 api 대신 전화번호 뒷자리 사용을 권장
    const orderQuery = `?order=${order}`;
    const cursorQuery = cursor === null ? "" : `&cursor=${cursor}`;
    const limitQuery = `&limit=${limit}`;
    const response = await fetch(
        "https://learn.codeit.kr/3608/foods" +
            orderQuery +
            cursorQuery +
            limitQuery
    );
    const body = await response.json();
    return body;
}
