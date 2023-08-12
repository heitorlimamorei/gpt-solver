export default function useCalcs() {
  function solveInss(value: number) {
    let inssValue = 0;
    if (value <= 1302) {
      inssValue = value * 0.075;
    }
    if (value > 1302.01 && value <= 2571.29) {
      inssValue = 1302.0 * 0.075 + (value - 1302.0) * 0.09;
    }
    if (value >= 2571.3 && value <= 3856.94) {
      inssValue =
        1302.0 * 0.075 + (2571.29 - 1302.0) * 0.09 + (value - 2571.3) * 0.12;
    }
    if (value >= 3856.95 && value <= 7507.49) {
      inssValue =
        1302.0 * 0.075 +
        (2571.29 - 1302.0) * 0.09 +
        (3856.94 - 2571.3) * 0.12 +
        (value - 3856.95) * 0.14;
    } else {
      if (value > 7087.22) {
        inssValue =
          1302.0 * 0.075 +
          (2571.29 - 1302.0) * 0.09 +
          (3856.94 - 2571.3) * 0.12 +
          (7507.49 - 3856.95) * 0.14;
      }
    }
    return Number(inssValue.toFixed(2));
  }
  function solveCompoundInterest(
    initialInvested: number,
    monthValue: number,
    tax: number,
    time: number
  ) {
    // time in months, tax per month
    time += 1;
    let currentTotalInvested = initialInvested;
    let monthTax = tax / 100; // converting 1% tax to 0.1 tax
    let parcelArray = [];
    const getTotalAmount = (currentTime) =>
      currentTotalInvested * (1 + monthTax) ** currentTime;
    for (let t = 0; t < time; t++) {
      currentTotalInvested += t > 0 ? monthValue : 0; // if month 0 do not add month value into  total
      parcelArray.push({
        totalInvested: currentTotalInvested,
        total: parseFloat(getTotalAmount(t).toFixed(2)),
        totalInTax: parseFloat(
          (getTotalAmount(t) - currentTotalInvested).toFixed(2)
        ),
        month: t,
      });
    }
    return parcelArray;
  }
  function solveSimpleInterest(
    initialInvested: number,
    monthValue: number,
    tax: number,
    time: number
  ) {
    // time in months, tax per month
    time += 1;
    let currentTotalInvested = initialInvested;
    let monthTax = tax / 100; // converting 1% tax to 0.1 tax
    let parcelArray = [];
    const getTotalInTax = (currentTime) =>
      currentTotalInvested * monthTax * currentTime;
    for (let t = 0; t < time; t++) {
      currentTotalInvested += t > 0 ? monthValue : 0; // if month 0 do not add month value into  total
      parcelArray.push({
        totalInvested: currentTotalInvested,
        total: getTotalInTax(t) + currentTotalInvested,
        totalInTax: getTotalInTax(t),
        month: t,
      });
    }
    return parcelArray;
  }
  function solveIr(value: number, dependents = 0) {
    const getValueMinusInss = () => {
      let inssValue = solveInss(value); // check that the limiting value remains the same
      return value - inssValue - dependents * (2275.08 / 12);
    };
    const valueF = getValueMinusInss(); // getting effective value for operation
    let irValue = 0;
    if (valueF > 1903.98) {
      //checking exemption
      if (valueF <= 2826.65) {
        irValue = (valueF - 1903.98) * 0.075;
      }
      if (valueF >= 2826.66 && valueF <= 3751.05) {
        irValue = (2826.65 - 1903.98) * 0.075 + (valueF - 2826.65) * 0.15;
      }
      if (valueF >= 3751.06 && valueF <= 4664.68) {
        irValue =
          (2826.65 - 1903.98) * 0.075 +
          (3751.05 - 2826.65) * 0.15 +
          (valueF - 3751.05) * 0.225;
      }
      if (valueF >= 4664.69) {
        irValue =
          (2826.65 - 1903.98) * 0.075 +
          (3751.05 - 2826.65) * 0.15 +
          (4664.68 - 3751.05) * 0.225 +
          (valueF - 4664.68) * 0.275;
      }
    } else {
      irValue = 0;
    }
    return Number(irValue.toFixed(2));
  }
  function calculateLiquidSalary(
    rawSalary: number,
    dependents: number,
    discount = 0
  ) {
    const inssValue = solveInss(rawSalary);
    const irpfValue = solveIr(rawSalary, dependents);
    const liquidSalary = rawSalary - (inssValue + irpfValue) - discount;
    return [
      {
        name: "rawSalary",
        value: rawSalary,
      },
      {
        name: "discount",
        value: discount,
      },
      {
        name: "inss",
        value: inssValue,
      },
      {
        name: "irpfValue",
        value: irpfValue,
      },
      {
        name: "liquidSalary",
        value: liquidSalary,
      },
    ];
  }
  function calculate13Salary(
    rawSalary: number,
    dependents: number,
    monthsWorkeds: number,
    parcelNum: number
  ) {
    const condition = parcelNum === 0 || parcelNum > 1; // check if in this parcel inss, irpf or liquid salary are required.
    const liquidSalary =
      calculateLiquidSalary(rawSalary, dependents)[4].value *
      (monthsWorkeds / 12);
    const inssValue = condition ? solveInss(rawSalary) : 0;
    const irpfValue = condition ? solveIr(rawSalary, dependents) : 0;
    return [
      {
        name: "rawSalary",
        value: rawSalary,
      },
      {
        name: "inss",
        value: inssValue,
      },
      {
        name: "irpfValue",
        value: irpfValue,
      },
      {
        name: "liquidSalary",
        value: condition
          ? parcelNum < 1
            ? liquidSalary
            : rawSalary / 2 - (inssValue + irpfValue)
          : rawSalary / 2,
      },
    ];
  }
  function calculateVacation(
    rawSalary: number,
    dependents: number,
    daysOfVacation: number,
    overtime = 0,
    Abonopecuniario = false,
    fistparcel13 = false
  ) {
    let liquidVacation = 0;
    const vacationPercentageRate = daysOfVacation / 30; // it's the base-30 ratio that determines the gross vacation pay based on the days taken
    let currentRawSalary =
      rawSalary * vacationPercentageRate + overtime + rawSalary / 3;
    let firstparcelof13 = 0;
    if (Abonopecuniario) {
      currentRawSalary += rawSalary / 3;
      currentRawSalary += rawSalary / 9; // 1/3 of the Abonopecuniario
    }
    if (fistparcel13) {
      firstparcelof13 = calculate13Salary(rawSalary, dependents, 12, 1)[3]
        .value;
      currentRawSalary += firstparcelof13;
    }
    const inssValue = solveInss(currentRawSalary);
    const irpfValue = solveIr(currentRawSalary, dependents);
    liquidVacation = currentRawSalary - (irpfValue + inssValue);
    return [
      {
        name: "rawSalary",
        value: rawSalary,
      },
      {
        name: "oneThirdOfVacation",
        value: parseFloat(((rawSalary * 1) / 3).toFixed(2)),
      },
      {
        name: "Abono pecuniário",
        value: parseFloat(((rawSalary * 1) / 3).toFixed(2)),
      },
      {
        name: " 1/3 Abono pecuniário",
        value: parseFloat(((rawSalary * 1) / 9).toFixed(2)),
      },
      {
        name: "advance payment of the first installment of the 13th salary",
        value: parseFloat(firstparcelof13.toFixed(2)),
      },
      {
        name: "INSS",
        value: inssValue,
      },
      {
        name: "IRPF",
        value: irpfValue,
      },
      {
        name: "total",
        value: parseFloat(currentRawSalary.toFixed(2)),
      },
      {
        name: "liquid vacacion",
        value: parseFloat(liquidVacation.toFixed(2)),
      },
    ];
  }
  return {
    solveInss,
    solveCompoundInterest,
    solveSimpleInterest,
    solveIr,
    calculateLiquidSalary,
    calculate13Salary,
    calculateVacation,
  };
}
