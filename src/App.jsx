/* eslint-disable react/prop-types */
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

function App() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const employees = [
    "eki",
    "arif",
    "faisal",
    "dembi",
    "zaki",
    "satria",
    "edo",
    "fahmi",
    "kamal",
  ];

  function generateScheduleForEmployee(startDay) {
    const schedule = [];
    for (let day = 0; day < daysInMonth; day++) {
      if ((day + startDay) % 7 < 4) {
        schedule.push(1);
      } else {
        schedule.push(0);
      }
    }
    return schedule;
  }

  const scheduleList = employees.map((_, index) =>
    generateScheduleForEmployee(index + 2),
  );

  const dateList = Array.from(
    { length: daysInMonth },
    (_, i) => new Date(year, month, i + 1),
  );

  const combinedSchedule = employees.map((employee, index) => {
    const workDays = scheduleList[index].filter((work) => work === 1).length;
    const offDays = scheduleList[index].length - workDays;
    const schedule = dateList.map((date, dayIndex) => ({
      date,
      work: scheduleList[index][dayIndex], // 1: bekerja, 0: libur
    }));

    return {
      employee,
      schedule,
      workDays,
      offDays,
    };
  });

  combinedSchedule.sort((a, b) => a.employee.localeCompare(b.employee));

  console.log(combinedSchedule);

  return (
    <ScheduleTable combinedSchedule={combinedSchedule} dateList={dateList} />
  );
}

function ScheduleTable({ combinedSchedule, dateList }) {
  return (
    <div className="w-full container mx-auto font-mono">
      <table className="border-separate w-full group border table-auto">
        <thead>
          <tr className="capitalize font-bold text-base">
            <td className="text-center">hari</td>
            {combinedSchedule.map((employeeSchedule, index) => (
              <td className="text-center" key={index}>
                <div className="flex flex-col">
                  <span>{employeeSchedule.employee}</span>
                  <span>
                    [
                    <span className="text-green-500">
                      {employeeSchedule.workDays}
                    </span>
                    <span>-</span>
                    <span className="text-red-500">
                      {employeeSchedule.offDays}
                    </span>
                    ]
                  </span>
                </div>
              </td>
            ))}
            <td className="text-center">tanggal</td>
          </tr>
        </thead>
        <tbody>
          {dateList.map((date, dayIndex) => (
            <tr key={dayIndex} className="even:bg-gray-200">
              <td className="text-right">
                {date.toLocaleDateString("id-ID", { weekday: "long" })}
              </td>
              {combinedSchedule.map((employeeSchedule, empIndex) => (
                <td key={empIndex} className="">
                  <div className="flex flex-col w-full items-center justify-center">
                    {/* <div className="flex h-full w-full justify-center items-center"> */}

                    {employeeSchedule.schedule[dayIndex].work === 1 ? (
                      <CheckCircleIcon className={"fill-green-500 size-8"} />
                    ) : (
                      <XCircleIcon className="fill-red-500 size-8" />
                    )}
                    {/* </div> */}
                  </div>
                </td>
              ))}
              <td className="text-left">
                {date.toLocaleDateString("id-ID", {
                  dateStyle: "short",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
