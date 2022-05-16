const axios = require("axios");

const url = "http://consultation.com/api/";

const createSpecialty = async (specialtyName) => {
  await axios.post(url + "specialties", {
    name: specialtyName,
    sphereId: "sphereId",
  });
};

const createPost = async (userId, specialtyName) => {
  return await axios.post(url + "posts", {
    title: "title",
    description: "description",
    userId,
    sphereId: "sphereId",
    specialty: specialtyName,
  });
};

const viewPost = async (postId, jwt) => {
  return await axios.get(url + "posts/" + postId, {
    headers: {
      Cookie: "jwt=" + jwt,
    },
  });
};

const extractPostId = (response) => {
  return response.data.post.id;
}

const prepareTestData = async () => {
  // Create User
  const response1 = await axios.post(url + "auth/signup", {
    email: "test@test.com",
    password: "password",
    firstName: "firstName",
    lastName: "lastName",
    isConsultant: false,
    phoneNumber: "+111222333444",
  });
  const userId1 = response1.data.user.id;
  const jwt1 = response1.headers["set-cookie"][0]
      .split(";")[0]
      .split("=")[1];

  const response2 = await axios.post(url + "auth/signup", {
    email: "test2@test.com",
    password: "password",
    firstName: "firstName",
    lastName: "lastName",
    isConsultant: false,
    phoneNumber: "+444333222111",
  });
  const userId2 = response2.data.user.id;
  const jwt2 = response2.headers["set-cookie"][0]
      .split(";")[0]
      .split("=")[1];

  const response3 = await axios.post(url + "auth/signup", {
    email: "test3@test.com",
    password: "password",
    firstName: "firstName",
    lastName: "lastName",
    isConsultant: false,
    phoneNumber: "+444333222111",
  });
  const userId3 = response3.data.user.id;
  const jwt3 = response3.headers["set-cookie"][0]
      .split(";")[0]
      .split("=")[1];

  const specialtyName1 = "Web Development";
  const specialtyName2 = "Design";
  const specialtyName3 = "Martial Arts";
  const specialtyName4 = "Machine Learning";

  // Create Specialties
  await createSpecialty(specialtyName1);
  await createSpecialty(specialtyName2);
  await createSpecialty(specialtyName3);
  await createSpecialty(specialtyName4);

  // Create Posts
  const post1 = extractPostId(await createPost(userId1, specialtyName1));
  const post2 = extractPostId(await createPost(userId1, specialtyName1));
  const post3 = extractPostId(await createPost(userId1, specialtyName1));
  const post4 = extractPostId(await createPost(userId1, specialtyName1));
  const post5 = extractPostId(await createPost(userId1, specialtyName1));
  const post6 = extractPostId(await createPost(userId1, specialtyName1));
  const post7 = extractPostId(await createPost(userId1, specialtyName1));

  await createPost(userId1, specialtyName2);
  const post8 = extractPostId(await createPost(userId1, specialtyName2));
  const post9 = extractPostId(await createPost(userId1, specialtyName2));
  const post10 = extractPostId(await createPost(userId1, specialtyName2));
  const post11 = extractPostId(await createPost(userId1, specialtyName2));

  await createPost(userId1, specialtyName3);
  await createPost(userId1, specialtyName3);
  await createPost(userId1, specialtyName3);

  await createPost(userId1, specialtyName4);
  await createPost(userId1, specialtyName4);
  const post12 = extractPostId(await createPost(userId1, specialtyName4));
  const post13 = extractPostId(await createPost(userId1, specialtyName4));


  // View Post
  await viewPost(post1, jwt1);
  await viewPost(post2, jwt1);
  await viewPost(post3, jwt1);
  await viewPost(post3, jwt2);
  await viewPost(post6, jwt2);
  await viewPost(post7, jwt2);

  await viewPost(post10, jwt1);
  await viewPost(post10, jwt1);
  await viewPost(post11, jwt3);
  await viewPost(post8, jwt2);
  await viewPost(post9, jwt2);

  await viewPost(post12, jwt3);
  await viewPost(post13, jwt3);
};

prepareTestData();
