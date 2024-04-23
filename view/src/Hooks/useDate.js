export const useDate = () => {
  const date = new Date()
  const currentYear = date.getFullYear()

  const weeks = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  // month and their lenght and number of weeks
  const allMonths = [
    { month: "January", days: 31, weeks: 5 },
    {
      month: "February",
      days: (currentYear % 4 === 0 && currentYear % 100 !== 0) || currentYear % 400 === 0 ? 29 : 28,
      weeks: 4,
    }, // February has 4 weeks in non-leap years
    { month: "March", days: 31, weeks: 5 },
    { month: "April", days: 30, weeks: 5 },
    { month: "May", days: 31, weeks: 5 },
    { month: "June", days: 30, weeks: 5 },
    { month: "July", days: 31, weeks: 5 },
    { month: "August", days: 31, weeks: 5 },
    { month: "September", days: 30, weeks: 5 },
    { month: "October", days: 31, weeks: 5 },
    { month: "November", days: 30, weeks: 5 },
    { month: "December", days: 31, weeks: 5 },
  ]

  //returning date data object
  return {
    fromDate: date.getDate() - 6,
    toDate: date.getDate(),
    currentWeekDay: weeks[date.getDay()],
    currentMonth: date.getMonth() + 1,
    currentYear,
    currentDate: date.toLocaleDateString(["en-UK"]),
    currentMonthName: allMonths[date.getMonth()].month,
    currentMonthLength: allMonths[date.getMonth()].days,
    prevMonthLength: allMonths[date.getMonth() === 0 ? 11 : date.getMonth() - 1].days,
    allMonths,
    todayDate: date.getDate(),
    prevMonthName: allMonths[date.getMonth() === 0 ? 11 : date.getMonth() - 1].month,
  }
}
