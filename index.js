/* Your Code Here */
// Define the createEmployeeRecord function
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
      firstName,
      familyName,
      title,
      payPerHour,
      timeInEvents: [],
      timeOutEvents: [],
    };
  }
  
  // Define the createEmployeeRecords function
  function createEmployeeRecords(employeeData) {
    return employeeData.map(data => createEmployeeRecord(data));
  }
  
  // Define the createTimeInEvent function
  function createTimeInEvent(dateStamp) {
    const [date, time] = dateStamp.split(' ');
    this.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(time),
      date,
    });
    return this;
  }
  
  // Define the createTimeOutEvent function
  function createTimeOutEvent(dateStamp) {
    const [date, time] = dateStamp.split(' ');
    this.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(time),
      date,
    });
    return this;
  }
  
  // Define the hoursWorkedOnDate function
// Define the hoursWorkedOnDate function
function hoursWorkedOnDate(date) {
    const timeInEvent = this.timeInEvents.find(event => event.date === date);
    const timeOutEvent = this.timeOutEvents.find(event => event.date === date);
    
    // Ensure both timeInEvent and timeOutEvent are present for the given date
    if (timeInEvent && timeOutEvent) {
      return (timeOutEvent.hour - timeInEvent.hour) / 100; // Convert to hours
    } else {
      return 0; // Employee didn't work on the specified date
    }
  }
  
  
  // Define the wagesEarnedOnDate function
  function wagesEarnedOnDate(date) {
    const hoursWorked = hoursWorkedOnDate.call(this, date);
    return hoursWorked * this.payPerHour;
  }
  
  // Define the allWagesFor function
  function allWages4() {
    const eligibleDates = this.timeInEvents.map(function (e) {
      return e.date;
    });
  
    const payable = eligibleDates.reduce(function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this), 0);
  
    return payable;
  }
  
  // Define the calculatePayroll function
  function calculatePayroll(employees) {
    return employees.reduce((total, employee) => total + allWages4.call(employee), 0);
  }
  
// Define the findEmployeeByFirstName function
function findEmployeeByFirstName(collection, firstNameString) {
    return collection.find(employee => employee.firstName === firstNameString);
  }
  

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}


const employeesData = [
    ["John", "Doe", "Developer", 20],
    ["Jane", "Smith", "Designer", 25],
];

const employees = createEmployeeRecords(employeesData);

createTimeInEvent(employees[0], "2023-10-22 0800");
createTimeOutEvent(employees[0], "2023-10-22 1600");

const johnsPay = wagesEarnedOnDate(employees[0], "2023-10-22"); // Calculate John's pay for a specific date
const totalPayroll = calculatePayroll(employees); // Calculate total payroll for all employees

console.log(johnsPay); // Output: 80
console.log(totalPayroll); // Output: 200
