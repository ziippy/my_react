export async function getReviews({
    order = "createdAt",
    offset = 0,
    limit = 6,
}) {
    // https://learn.codeit.kr/api/film-reviews 에서 api 대신 전화번호 뒷자리 사용을 권장
    const query = `order=${order}&offset=${offset}&limit=${limit}`;
    const response = await fetch(
        `https://learn.codeit.kr/3608/film-reviews?${query}`
    );
    const body = await response.json();
    return body;
}
