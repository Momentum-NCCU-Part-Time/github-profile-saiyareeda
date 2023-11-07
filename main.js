/* Declaring User Profile and User Repos URL's as Constants*/
const userProfile = 'https://api.github.com/users/saiyareeda';
const userRepos = 'https://api.github.com/users/saiyareeda/repos';

let container = document.querySelector('.container')


/*Defining getUserDetails() - to retrieve user Profile Details*/
async function getUserDetails() {
  try {
    const response = await fetch(
      userProfile,
      {
        method: 'GET',
      },
    );
    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }
    const userDetails = await response.json();
    return userDetails;
  } catch (error) {
    console.log(error);
  }
}

getUserDetails().then(userDetails => {
  console.log(userDetails);
  let photo = document.createElement('img')
  let username = document.createElement('h1');
  let githubInfo = document.createElement('ul')
  let location = document.createElement('li');
  let githubUrl = document.createElement('li');
  let urlLink = document.createElement('a')
  let githubUserName = document.createElement('li');
  let githubRepos = document.createElement('h1');

  githubInfo.classList.add("github-info");
  location.classList.add("location");
  githubUrl.classList.add("github-url");
  githubUserName.classList.add("github-username");
  githubRepos.classList.add("github-repos")

  photo.src = userDetails['avatar_url'];
  username.innerText = userDetails['name'];
  location.innerText = "Location: " + userDetails['location'];
  githubUserName.innerText = "GitHub Username: " + userDetails['login'];
  githubUrl.innerText = "GitHub URL: ";
  urlLink.innerHTML = userDetails.login;
  urlLink.href = userDetails.html_url;
  githubRepos.innerText = "GitHub Repos"

  container.appendChild(photo);
  container.appendChild(username);
  container.appendChild(githubInfo);
  githubInfo.appendChild(location);
  githubInfo.appendChild(githubUrl);
  githubUrl.appendChild(urlLink);
  githubInfo.appendChild(githubUserName);
  container.appendChild(githubRepos);

});

/*Defining getRepos() - to retrieve user public repository list*/
async function getRepos() {
  try {
    const response = await fetch(
      userRepos,
      {
        method: 'GET',
      },
    );
    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }
    const repoData = await response.json();
    return repoData;
  } catch (error) {
    console.log(error);
  }
}

getRepos().then(repoData => {
  console.log(repoData);
  let reposList = document.createElement('a');

  let repoOne = document.createElement("li");
  let repoOneLink = document.createElement("a");
  repoOneLink.innerText = repoData[0]["name"];
  repoOneLink.href = repoData[0]["html_url"];
  repoOne.appendChild(repoOneLink);
  reposList.appendChild(repoOne);

  let repoTwo = document.createElement("li");
  let repoTwoLink = document.createElement("a");
  repoTwoLink.innerText = repoData[1]["name"];
  repoTwoLink.href = repoData[1]["html_url"];
  repoTwo.appendChild(repoTwoLink);
  reposList.appendChild(repoTwo);

  console.log(reposList.innerText);
  container.appendChild(reposList);
});
