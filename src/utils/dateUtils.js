/*
For line 7 pay attention to this, which can be fixed later

 https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd#:~:text=BE%20CAREFUL%20with%20this%20method%20as%20it%20first%20converts%20to%20the%20date%20to%20UTC.%20If%20you%20are%20in%20a%20%2B%20timezone%20and%20your%20time%20portion%20is%20early%20in%20the%20day%2C%20then%20it%20could%20roll%2Dback%20a%20day.%20Alternatively%2C%20if%20you%27re%20in%20a%20%2D%20timezone%20and%20your%20time%20portion%20is%20late%20in%20the%20day%2C%20then%20it%20could%20roll%20forward%20a%20day.
*/

export const formatDate = (date) => date.toISOString().split("T")[0];
export const today = formatDate(new Date());
