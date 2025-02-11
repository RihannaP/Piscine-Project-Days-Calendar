import { monthgrid } from './common.mjs';  

test("it should return corect week of a month", () => {
let FebMonth2025 = monthgrid(2025, 1)
let firstWeekFeb = FebMonth2025[0]
let secondWeekFeb = FebMonth2025[1]
let lastWeekFeb = FebMonth2025[4]

console.log(firstWeekFeb);

expect(firstWeekFeb).toEqual(['', '', '', '', '', 1, 2])
expect(secondWeekFeb).toEqual([3, 4, 5, 6, 7, 8, 9])
expect(lastWeekFeb).toEqual( [24, 25, 26, 27,
    28, '', ''])
})