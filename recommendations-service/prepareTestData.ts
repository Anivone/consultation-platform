import axios from "axios";
import jwt from "jsonwebtoken";

const url = "http://consultation.com/api/";

const createSpecialty = async (specialtyName: string) => {
  await axios.post(url + "specialties", {
    name: specialtyName,
    sphereId: "sphereId",
  });
};

const createPost = async (userId: string, specialtyName: string) => {
  return await axios.post(url + "posts", {
    title: "title",
    description: "description",
    userId,
    sphereId: "sphereId",
    specialty: specialtyName,
  });
};

const signin = (userId: string) => {
  const payload = {
    id: userId,
    email: "test@test.com",
    firstName: "firstName",
    lastName: "lastName",
    isConsultant: false,
  };

  return jwt.sign(payload, process.env.JWT_KEY!);
};

const viewPost = async (postId: string, userId: string) => {
  return await axios.get(url + "posts/" + postId, {
    headers: {
      Cookie: "jwt=" + signin(userId),
    },
  });
};

export const prepareTestData = async () => {
  return await axios.get(url + '/posts');
  // Create User
  const response = await axios.post(url + "auth/signup", {
    email: "test@test.com",
    password: "password",
    firstName: "firstName",
    lastName: "lastName",
    isConsultant: false,
    phoneNumber: "+111222333444",
  });
  const userId = response.data.user.id;

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
  const post1 = await createPost(userId, specialtyName1);
  const post1Id = post1.data.post.id!;
  await createPost(userId, specialtyName1);
  await createPost(userId, specialtyName1);
  await createPost(userId, specialtyName1);
  await createPost(userId, specialtyName1);
  await createPost(userId, specialtyName1);
  await createPost(userId, specialtyName1);

  await createPost(userId, specialtyName2);
  await createPost(userId, specialtyName2);
  await createPost(userId, specialtyName2);
  await createPost(userId, specialtyName2);

  await createPost(userId, specialtyName3);
  await createPost(userId, specialtyName3);
  await createPost(userId, specialtyName3);

  await createPost(userId, specialtyName4);
  await createPost(userId, specialtyName4);
  await createPost(userId, specialtyName4);
  await createPost(userId, specialtyName4);

  // View Post
  await viewPost(post1Id, userId);
};

prepareTestData();
