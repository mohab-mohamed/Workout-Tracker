
class Dashboard {
	async getWorkouts() {
		try {
			const allWorkouts = await $.get("/api/workouts");
			console.log(allWorkouts);
			return allWorkouts;
		} catch {
			throw new Error("Cant get all workouts");
		}
	}

}

