const dashB = new Dashboard();

$(document).ready(function () {
  const $workoutForm = $("form.workout");
  const $workoutInput = $("#workoutInput");
  const $cardContainer = $(".cardContainer");
  const $excerciseModal = $("#excerciseModal");
  const $excerciseForm = $(".excerciseForm");
  function init() {
    renderWorkouts();
  }
  init();
  async function addWorkout(name) {
    try {
      const newWorkout = await $.post("/api/workout", {
        name: name,
      });
      console.log(newWorkout);
      // go back to dashboard
      console.log("workout added");
    } catch (err) {
      console.log(err);
    }
  }

  async function addExcercise(
    name,
    type,
    weight,
    sets,
    reps,
    duration,
    distance,
    workoutID
  ) {
    try {
      // console.log($(this).attr("data-id"));
      const newExcercise = await $.post("/api/excercise", {
        name: name,
        type: type,
        weight: weight,
        sets: sets,
        reps: reps,
        duration: duration,
        distance: distance,
        workoutID: workoutID,
      });
      console.log(newExcercise);
      // go back to dashboard
      console.log("excercise added");
    } catch (err) {
      console.log(err);
    }
  }

  // add function to get transaction
  async function renderWorkouts() {
    $cardContainer.empty();
    const allWorkouts = await dashB.getWorkouts();
    console.log("ALL Workouts", allWorkouts);
    allWorkouts.forEach((workout) => {
      const cardContainer = $("<div>");
      cardContainer.addClass("card");
      cardContainer.addClass("text-center");
      cardContainer.attr("data-id", workout._id);

      const cardHeader = $("<div>");
      cardHeader.addClass("card-header");

      const flexHeader = $("<div>");
      flexHeader.addClass("flexHeader");

      const spanName = $("<span>");
      spanName.text(workout.name);

      // const numberWithCommas = transaction.amount
      //   .toString()
      //   .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      const spanPlus = $("<span>");
      spanPlus.addClass("plus");
      spanPlus.attr("id", workout._id);
      spanPlus.text("+");

      // const spanDollarSign = $("<span>");
      // spanDollarSign.text(numberWithCommas);

      const bodyContainer = $("<div>");
      bodyContainer.addClass("card-body");

      // const noteP = $("<p>");
      // noteP.addClass("card-text");
      // noteP.text(transaction.note);

      const footContainer = $("<div>");
      footContainer.addClass("card-footer");
      footContainer.addClass("text-muted");
      // footContainer.text(transaction.createdAt);

      //flex header
      // spanPlus.append(spanDollarSign);
      flexHeader.append(spanName);
      flexHeader.append(spanPlus);

      //body
      // bodyContainer.append(noteP);

      //footer
      //pass

      //cardHeader
      cardHeader.append(flexHeader);

      cardContainer.append(cardHeader);
      //   cardContainer.append(bodyContainer);
      cardContainer.append(footContainer);

      $cardContainer.append(cardContainer);
      
      let $plus = $("#" + workout._id);
      console.log("plus", $plus);
      let modalOptions = {
        keyboard: true,
        focus: true,
        show: true
      };

      $plus.click(function () {
        $excerciseModal.modal(modalOptions);
        $excerciseForm.attr("data-id", workout._id);
      });

      const allExcercises = workout.excercises;

      let totalDuration = 0;
      for (let i = 0; i < allExcercises.length; i++) {
        totalDuration += parseInt(allExcercises[i].duration);
        const $excerciseTitle = $("<p>");
        $excerciseTitle.text("Exercise name: " + allExcercises[i].name);

        const $excerciseType = $("<p>");
        $excerciseType.text("Type: " + allExcercises[i].type);

        const $excerciseWeight = $("<p>");
        $excerciseWeight.text("Weight: " + allExcercises[i].weight);

        const $excerciseSets = $("<p>");
        $excerciseSets.text("Sets: " + allExcercises[i].sets);

        const $excerciseReps = $("<p>");
        $excerciseReps.text("Reps: " + allExcercises[i].reps);

        const $excerciseDuration = $("<p>");
        $excerciseDuration.text("Duration: " + allExcercises[i].duration);

        const $excerciseDistance = $("<p>");
        $excerciseDistance.text("Distance: " + allExcercises[i].distance);

        bodyContainer.append($excerciseTitle);
        bodyContainer.append($excerciseType);
        bodyContainer.append($excerciseWeight);
        bodyContainer.append($excerciseSets);
        bodyContainer.append($excerciseReps);
        bodyContainer.append($excerciseDuration);
        bodyContainer.append($excerciseDistance);
      }
      const $totalDuration = $("<p>");
        $totalDuration.text("Total Duration: " + totalDuration);
        $totalDuration.css("font-weight", "bold");
        bodyContainer.append($totalDuration);

      cardContainer.append(bodyContainer);
    });
  }

  $workoutForm.on("submit", async function (event) {
    event.preventDefault();

    const workoutData = {
      name: $workoutInput.val().trim(),
    };
    console.log("Workout Data: ", workoutData);
    const { name } = workoutData;

    addWorkout(name);

    $workoutInput.val("");

    await renderWorkouts();
    // location.reload();
    setTimeout(function () {
      console.log("refreshed");
    }, 1);

    const $formModal = $("#formModal");

    $formModal.modal("hide");
  });
  
  const $typeSelect = $("#typeSelect");
  const $nameInput = $("#nameInput");
  const $weightInput = $("#weightInput");
  const $setsInput = $("#setsInput");
  const $repsInput = $("#repsInput");
  const $durationInput = $("#durationInput");
  const $distanceInput = $("#distanceInput");

  $excerciseForm.on("submit", async function (event) {
    event.preventDefault();

    console.log($excerciseForm.attr("data-id"));

    const excerciseData = {
      name: $nameInput.val().trim(),
      type: $typeSelect.val().trim(),
      weight: parseInt($weightInput.val().trim()),
      sets: parseInt($setsInput.val().trim()),
      reps: parseInt($repsInput.val().trim()),
      duration: parseInt($durationInput.val().trim()),
      distance: parseInt($distanceInput.val().trim()),
      id: $excerciseForm.attr("data-id")
    };

    console.log("Excercise Data: ", excerciseData);
    const { name, type, weight, sets, reps, duration, distance, id } = excerciseData;

    addExcercise(name, type, weight, sets, reps, duration, distance, id);

    $workoutInput.val("");

    await renderWorkouts();
    // location.reload();
    setTimeout(function () {
      console.log("refreshed");
    }, 1);

    const $excerciseModal = $("#excerciseModal");

    $excerciseModal.modal("hide");
  });
});
