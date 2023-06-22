const reminderType = (reminder, time) => {
  const deadline = new Date(time);

  if (reminder === "5 minutes before") {
    deadline.setMinutes(deadline.getMinutes() - 5);
  }
  if (reminder === "15 minutes before") {
    deadline.setMinutes(deadline.getMinutes() - 15);
  }
  if (reminder === "30 minutes before") {
    deadline.setMinutes(deadline.getMinutes() - 30);
  }
  if (reminder === "1 hour before") {
    deadline.setMinutes(deadline.getMinutes() - 60);
  }
  if (reminder === "4 hours before") {
    deadline.setMinutes(deadline.getMinutes() - 240);
  }
  if (reminder === "a day before") {
    deadline.setMinutes(deadline.getDate() - 1);
  }
  if (reminder === "No reminder") {
    return;
  }
  return deadline;
};

const seeResult = (timeDiff) => {
  const secondsDiff = Math.floor(timeDiff / 1000);
  const minutesDiff = Math.floor(secondsDiff / 60);
  const hoursDiff = Math.floor(minutesDiff / 60);

  return console.log(
    `Diferența este de ${hoursDiff} ore, ${minutesDiff % 60} minute și ${
      secondsDiff % 60
    } secunde.`
  );
};

const triggerTime = (time, reminder, repetition) => {
  const deadline = new Date(time);
  const today = new Date();
  let trigger;
  // -----Daily------
  if (repetition === "Daily") {
    if (deadline.getTime() < today.getTime()) {
      deadline.setDate(deadline.getDate() + 1);
    }
    const type = new Date(reminderType(reminder, deadline));
    const timeDiff = type.getTime() - today.getTime();
    // seeResult(timeDiff);
    trigger = {
      seconds: Math.floor(timeDiff / 1000),
      repeats: true,
    };
  }

  // ----------Weekly---------
  if (repetition === "Weekly") {
    if (deadline < today) {
      deadline.setDate(deadline.getDate() + 7);
    }
    const type = new Date(reminderType(reminder, deadline));
    console.log(`type:`, type);
    const timeDiff = type.getTime() - today.getTime();
    // seeResult(timeDiff);

    trigger = {
      repeats: true,
      weekday: type.getDay(),
      hour: type.getHours(),
      minute: type.getMinutes(),
    };
  }

  // --------Monthly-----------
  if (repetition === "Monthly") {
    if (deadline < today) {
      deadline.setMonth(deadline.getMonth() + 1);
    }
    const type = new Date(reminderType(reminder, deadline));
    const timeDiff = type.getTime() - today.getTime();
    // seeResult(timeDiff);

    trigger = {
      seconds: Math.floor(timeDiff / 1000),
      repeats: true,
    };
  }

  if (repetition === "Yearly") {
    if (deadline < today) {
      deadline.setFullYear(deadline.getFullYear() + 1);
    }
    const type = new Date(reminderType(reminder, deadline));
    const timeDiff = type.getTime() - today.getTime();
    // seeResult(timeDiff);

    trigger = {
      repeats: true,
      month: type.getMonth(),
      day: type.getDate(),
      hour: type.getHours(),
      minute: type.getMinutes(),
    };
  }

  if (repetition === "One time") {
    const type = new Date(reminderType(reminder, deadline));
    const timeDiff = type.getTime() - today.getTime();
    // seeResult(timeDiff);
    trigger = {
      seconds: Math.floor(timeDiff / 1000), // Timpul în secunde între notificări
    };
  }
  return trigger;
};

export default triggerTime;
