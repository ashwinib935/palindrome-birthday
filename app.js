function reverseString(str) {
    var characterList = str.split("");
    var reverseCharacterList = characterList.reverse();
    var reverseStr = reverseCharacterList.join("");
    return reverseStr;
}

function isPalindrome(str) {
    var reverseStr = reverseString(str);

    return str == reverseStr;

}



function convertDateToString(date) {
    var dateStr = {
        day: " ",
        month: " ",
        year: " "
    };
    if (date.day < 10) {
        dateStr.day = "0" + date.day;
    } else {
        dateStr.day = date.day.toString();
    }
    if (date.month < 10) {
        dateStr.month = "0" + date.month;
    } else {
        dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();

    return dateStr;
}

function generateAllDateFormat(date) {
    var dateStr = convertDateToString(date);

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    var listOfDateFormat = [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];

    return listOfDateFormat;

}

function isPalindromeForAllFormat(date) {
    var listOfDateFormat = generateAllDateFormat(date);
    var flag = false;
    for (let i = 0; i < listOfDateFormat.length; i++) {
        if (isPalindrome(listOfDateFormat[i])) {
            flag = true;
            break;
        }
    }
    return flag;
}


//  console.log(isPalindromeForAllFormat(date));
function checkLeapYear(year) {
    if (year % 400 === 0)
        return true;
    if (year % 100 === 0)
        return true
    if (year % 4 === 0)
        return true;
}

function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year
    var daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 2) {
        if (checkLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month++;
            }

        } else {

            if (day > 28) {
                day = 1;
                month++;
            }
        }

    } else {
        if (day > daysInMonths[month - 1]) {
            day = 1;
            month++;
        }
    }
    if (month > 12) {
        month = 1;
        year++;
    }
    return {
        day: day,
        month: month,
        year: year
    }
}

function getPreviousDate(date) {
    var day = date.day - 1;
    var month = date.month;
    var year = date.year
    var daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 3) {
        if (checkLeapYear(year)) {
            day = 29;
            month = 2;


        } else {
            day = 28;
            month = 2;
        }

    } else {
        if (month > 1 && day < 1) {
            day = daysInMonths[month - 2]
            month--;
        }
        if (month == 1 && day < 1) {
            day = 31;
            month = 12;
            year--;
        }

    }
    return {
        day: day,
        month: month,
        year: year
    }

}

function getNextPalindromeDate(date) {
    var cnt = 0;
    var nextDate = getNextDate(date);
    while (1) {
        cnt++;
        var isPalindrome = isPalindromeForAllFormat(nextDate)
        if (isPalindrome) {
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [cnt, nextDate];
}

function getPreviousPalindromeDate(date) {
    var cnt = 0;
    var previousDate = getPreviousDate(date);
    while (1) {
        cnt++;
        var isPalindrome = isPalindromeForAllFormat(previousDate)
        if (isPalindrome) {
            break;
        }
        previousDate = getPreviousDate(previousDate);
    }
    return [cnt, previousDate];
}

var bdateInput = document.querySelector("#bdateInput");
var btnShow = document.querySelector("#btn-show");
var outputEl = document.querySelector("#outputEl");


function clickHandler() {

    var bdate = bdateInput.value;
    if (bdate !== '') {
        var listOfdate = bdate.split("-");
        var date = {
            day: Number(listOfdate[2]),
            month: Number(listOfdate[1]),
            year: Number(listOfdate[0])
        };
        var isPalindrome = isPalindromeForAllFormat(date);
        if (isPalindrome) {
            outputEl.innerText = "YAA !! Your birthday is palindrome.😊😇"
        } else {
            var [cnt1, nextDate] = getNextPalindromeDate(date);
            var [cnt2, previousDate] = getPreviousPalindromeDate(date);
            outputEl.innerText = `No! your birthday is not palindrome. The next palindrome date is: ${nextDate.day}-${nextDate.month}-${nextDate.year}. You missed it by ${cnt1} days. 😢😢 and The previous palindrome date is: ${previousDate.day}-${previousDate.month}-${previousDate.year}.You missed it by ${cnt2} days. 😢😢 `
        }

    }
}




btnShow.addEventListener("click", clickHandler);