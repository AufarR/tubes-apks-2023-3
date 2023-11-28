import http from "k6/http";
import { check } from "k6";
// const http = require("k6/http");
// const path = require("path");

// belum diatur sesuai jenis test
module.exports.options = {
  vus: 1,
  // duration: "1s",
	iterations: 3,
	// minIterationDuration: "1s",
	// ttl: "1s",
};

// belum diatur sesuai jenis test
module.exports.default = function () {
  // const port = process.env.APP_PORT || 5000;
  const port = 5001;
  const baseUrl = `http://localhost:${port}`;

  let res;

  const CREDENTIALS_DUMMY1 = {
    // username: __ENV.TEST_USERNAME || "",
    // password: __ENV.TEST_PASSWORD || "",
    username: "superadmin",
    password: "pw123456",
  };

  let token;

  const CINEMA_DUMMY1 = {
    name: "cinema-bandung",
    address: "bandung, 10",
    phone: "08123456789",
    location: "bandung",
    price: 50000,
  };

  const CINEMA_DUMMY2 = {
    name: "cinema-jakarta",
    address: "jakarta, 20",
    phone: "08987654321",
    location: "jakarta",
    price: 30000,
  };

  let cinemaId = "";

  // const CINEMA_PHOTO_DUMMY_PATH1 = `${__ENV.TEST_PHOTO_PATH}`;
  const CINEMA_PHOTO_DUMMY_PATH1 = "https://www.google.com";

  const MOVIE_DUMMY1 = {
    title: "movie-bandung",
    description: "movie-bandung",
    duration: 120,
    genre: "action",
    director: "wisnu",
    casts: ["wisnu", "wisnu"],
    poster: "https://www.google.com",
    trailer: "https://www.google.com",
  };

  const MOVIE_DUMMY2 = {
    title: "movie-jakarta",
    description: "movie-jakarta",
    duration: 120,
    genre: "action",
    director: "wisnu",
    casts: ["wisnu", "wisnu"],
    poster: "https://www.google.com",
    trailer: "https://www.google.com",
  };

  // const MOVIE_PHOTO_DUMMY_PATH1 = `${__ENV.TEST_PHOTO_PATH}`;
  const MOVIE_PHOTO_DUMMY_PATH1 = "https://www.google.com";

  let movieId = "";

  const SHOWTIME_DUMMY1 = {
    startAt: "bandung",
    startDate: "2023-09-24T00:00:00.000Z",
    endDate: "2023-09-24T00:02:00.000Z",
    movieId: "650d3fa4dd4dc724ef947f6c",
    cinemaId: "650e53ee27d92c7c0c511001",
  };

  const SHOWTIME_DUMMY2 = {
    startAt: "jakarta",
    startDate: "2023-09-24T00:00:00.000Z",
    endDate: "2023-09-24T00:02:00.000Z",
    movieId: "650d3fa4dd4dc724ef947f6c",
    cinemaId: "650e53ee27d92c7c0c511001",
  };

  let showtimeId = "";

  const RESERVATION_DUMMY1 = {
    date: "2025/09/24",
    startAt: "bandung",
    seats: ["B"],
    ticketPrice: 50000,
    total: 1,
    movieId: "65658dc08d2090ce8d8dcd6f",
    cinemaId: "65658d488d209032e18dcd66",
    username: "wisnu",
    phone: "08123456789",
  };

  const RESERVATION_DUMMY2 = {
    date: "2025/09/24",
    startAt: "jakarta",
    seats: ["B"],
    ticketPrice: 50000,
    total: 1,
    movieId: "65658dc08d2090ce8d8dcd6f",
    cinemaId: "65658d488d209032e18dcd66",
    username: "wisnu",
    phone: "08123456789",
  };

  let reservationId = "";

  // Users
  const userSmoke = () => {
    // Login
    const login = () => {
      res = http.post(
        `${baseUrl}/users/login`,
        JSON.stringify(CREDENTIALS_DUMMY1),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (
        check(res, {
          "Login status is OK": (r) => r.status === 200,
          // "Response is an object": (r) => typeof res.json() === "object",
        })
      )
        token = res.json().token;

			// console.log("body", res.json());
			// console.log("token", token);
    };

    const run = () => {
      login();
    };

    return { run };
  };

  // Cinemas
  const cinemaSmoke = () => {
    // Add new cinema
    const create = (data = CINEMA_DUMMY1) => {
      res = http.post(`${baseUrl}/cinemas`, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (
        check(res, {
          "Create cinema is Created": (r) => r.status === 201,
          // "Response is an object": (r) => typeof res.json() === "object",
        })
      ) {
        cinemaId = res.json()._id;
      }


    };

    // Get all cinemas
    const getAll = () => {
      res = http.get(`${baseUrl}/cinemas`);

      check(res, {
        "Get all cinemas is OK": (r) => r.status === 200,
        // "Response is an array": (r) => Array.isArray(res.json()),
      });
    };

    // Get cinema by id
    const getOne = (id = cinemaId) => {
      res = http.get(`${baseUrl}/cinemas/${id}`);

      check(res, {
        "Get one cinema is OK": (r) => r.status === 200,
        // "Response is an object": (r) => typeof res.json() === "object",
      });
    };

    // Update cinema by id
    const update = (data = CINEMA_DUMMY2, id = cinemaId) => {
      res = http.patch(`${baseUrl}/cinemas/${id}`, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      check(res, {
        "Update cinema is OK": (r) => r.status === 200,
        // "Response is an object": (r) => typeof res.json() === "object",
      });
    };

    // Upload cinema photo
    const uploadPhoto = (path = CINEMA_PHOTO_DUMMY_PATH1) => {
      res = http.post(
        `${baseUrl}/cinemas/photo/${cinemaId}`,
        {
          files: {
            file: path,
          },
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      check(res, {
        "Upload cinema photo is OK": (r) => r.status === 200,
        // "Response is an object": (r) => typeof res.json() === "object",
      });
    };

    // Delete cinema by id
    const deleteOne = (id = cinemaId) => {
      res = http.del(`${baseUrl}/cinemas/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      check(res, {
        "Delete cinema is OK": (r) => r.status === 200,
        // "Response is an object": (r) => typeof res.json() === "object",
      });
    };

    const run = () => {
      create();
      getAll();
      getOne();
      update();
      uploadPhoto();
      deleteOne();
    };

    return { run };
  };

  // Movies
  const movieSmoke = () => {
    // Add new movie
    const create = (data = MOVIE_DUMMY1) => {
      res = http.post(`${baseUrl}/movies`, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (
        check(res, {
          "Create movie is Created": (r) => r.status === 201,
          // "Response is an object": (r) => typeof res.json() === "object",
        })
      ) {
        movieId = res.json()._id;
      }
    };

    // Get all movies
    const getAll = () => {
      res = http.get(`${baseUrl}/movies`);

      check(res, {
        "Get all movies is OK": (r) => r.status === 200,
        // "Response is an array": (r) => Array.isArray(res.json()),
      });
    };

    // Get movie by id
    const getOne = (id = movieId) => {
      res = http.get(`${baseUrl}/movies/${id}`);

      check(res, {
        "Get one movie is OK": (r) => r.status === 200,
        // "Response is an object": (r) => typeof res.json() === "object",
      });
    };

    // Update movie by id
    const update = (data = MOVIE_DUMMY2, id = movieId) => {
      res = http.patch(`${baseUrl}/movies/${id}`, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      check(res, {
        "Update movie is OK": (r) => r.status === 200,
        // "Response is an object": (r) => typeof res.json() === "object",
      });
    };

    // Upload movie photo
    const uploadPhoto = (id = movieId, path = MOVIE_PHOTO_DUMMY_PATH1) => {
      res = http.post(
        `${baseUrl}/movies/photo/${id}`,
        {
          files: {
            file: path,
          },
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      check(res, {
        "Upload movie photo is OK": (r) => r.status === 200,
        // "Response is an object": (r) => typeof res.json() === "object",
      });
    };

    // Delete movie by id
    const deleteOne = (id = movieId) => {
      res = http.del(`${baseUrl}/movies/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      check(res, {
        "Delete movie is OK": (r) => r.status === 200,
        // "Response is an object": (r) => typeof res.json() === "object",
      });
    };

    const run = () => {
      create();
      getAll();
      getOne();
      update();
      uploadPhoto();
      deleteOne();
    };

    return { run };
  };

  // showtimes
  const showtimeSmoke = () => {
    // Add new showtime
    const create = (data = SHOWTIME_DUMMY1) => {
      res = http.post(`${baseUrl}/showtimes`, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (
        check(res, {
          "Create showtime is Created": (r) => r.status === 201,
          // "Response is an object": (r) => typeof res.json() === "object",
        })
      ) {
        showtimeId = res.json()._id;
      }
    };

    // Get all showtimes
    const getAll = () => {
      res = http.get(`${baseUrl}/showtimes`);

      check(res, {
        "Get all showtime is OK": (r) => r.status === 200,
        // "Response is an array": (r) => Array.isArray(res.json()),
      });
    };

    // Get showtime by id
    const getOne = (id = showtimeId) => {
      res = http.get(`${baseUrl}/showtimes/${id}`);

      check(res, {
        "Get one showtime is OK": (r) => r.status === 200,
        // "Response is an object": (r) => typeof res.json() === "object",
      });
    };

    // Update showtime by id
    const update = (data = SHOWTIME_DUMMY2, id = showtimeId) => {
      res = http.patch(`${baseUrl}/showtimes/${id}`, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      check(res, {
        "Update showtime is OK": (r) => r.status === 200,
        // "Response is an object": (r) => typeof res.json() === "object",
      });
    };

    // Delete showtime by id
    const deleteOne = (id = showtimeId) => {
      res = http.del(`${baseUrl}/showtimes/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      check(res, {
        "Delete showtime is OK": (r) => r.status === 200,
        // "Response is an object": (r) => typeof res.json() === "object",
      });
    };

    const run = () => {
      create();
      getAll();
      getOne();
      update();
      deleteOne();
    };

    return { run };
  };

  // reservations
  const reservationSmoke = () => {
    // Add new reservation
    const create = (data = RESERVATION_DUMMY1) => {
      res = http.post(`${baseUrl}/reservations`, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (
        check(res, {
          "Create reservation is Created": (r) => r.status === 201,
          // "Response is an object": (r) => typeof res.json() === "object",
        })
      ) {
        reservationId = res.json()._id;
      }
    };

    // Get all reservations
    const getAll = () => {
      res = http.get(`${baseUrl}/reservations`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      check(res, {
        "Get all reservation is OK": (r) => r.status === 200,
        "Response is an array": (r) => Array.isArray(res.json()),
      });
    };

    // Get reservation by id
    const getOne = (id = reservationId) => {
      res = http.get(`${baseUrl}/reservations/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      check(res, {
        "Get one reservation is OK": (r) => r.status === 200,
        // "Response is an object": (r) => typeof res.json() === "object",
      });
    };

    // Update reservation by id
    const update = (data = RESERVATION_DUMMY2, id = reservationId) => {
      res = http.patch(`${baseUrl}/reservations/${id}`, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      check(res, {
        "Update reservation is OK": (r) => r.status === 200,
        // "Response is an object": (r) => typeof res.json() === "object",
      });
    };

    // Delete reservation by id
    const deleteOne = (id = reservationId) => {
      res = http.del(`${baseUrl}/reservations/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      check(res, {
        "Delete reservation is OK": (r) => r.status === 200,
        // "Response is an object": (r) => typeof res.json() === "object",
      });
    };

    const run = () => {
      create();
      getAll();
      getOne();
      update();
      deleteOne();
    };

    return { run };
  };

  const run = () => {
    userSmoke().run();
    cinemaSmoke().run();
    // movieSmoke().run();
    // showtimeSmoke().run();
    // reservationSmoke().run();
  };

  run();
};
