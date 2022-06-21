let a= "www.airbnb.co.kr/rooms/32719760?adults=1&category_tag=Tag%3A675&children=0&infants=0&search_mode=flex_destinations_search&check_in=2022-07-01&check_out=2022-07-06&previous_page_section_name=1000"
let result = a.split("rooms/")[1].split("?")[0]
console.log(result);