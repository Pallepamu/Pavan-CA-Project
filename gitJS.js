var userURL = "https://api.github.com/users/"

function fetch(completeURL)
{
	return new Promise(function(resolve, reject) 
	{
		var xhr = new XMLHttpRequest();
		xhr.open("GET", completeURL, true);
  
		xhr.onreadystatechange = function() 
		{
			if (xhr.readyState == XMLHttpRequest.DONE) 
			{
				resolve(JSON.parse(this.responseText));
			}
			if(xhr.status != 200)
			{
				reject("Unable to find spcified user");
			}
		};
		
		xhr.send();
	})
};

function fetchRepos(completeURL)
{
	fetch(completeURL).then(function(provided) 
	{
		var repoList = document.getElementById("repositories");
		
		repoList.innerHTML = '';
		
		for(var x=0; x < provided.length; x ++)
		{
			var newRepoLI = document.createElement("li");
   			var name = document.createElement("div");
    		var description = document.createElement("div");
    		name.innerHTML = "Name: " + provided[x].name;
    		description.innerHTML = "Description: " + provided[x].description;
    		newRepoLI.appendChild(name);
    		newRepoLI.appendChild(description);
    		repoList.appendChild(newRepoLI);
    	}				
	},
	function(err) 
	{     
		alert(err);
    });
}

function submitButton() {
	
	var input = document.getElementById("usernameInput");
	var userName = input.value;
	var completeURL = userURL+userName;

	fetch(completeURL).then(function(provided) 
	{
		document.getElementById("profilePicture").src = provided.avatar_url;
		document.getElementById("name").innerHTML = "Name: " + provided.name;
		document.getElementById("username").innerHTML = "Username: " + provided.login;
		document.getElementById("email").innerHTML = "Email: " + provided.email;
		document.getElementById("location").innerHTML = "Location: " + provided.location;
		document.getElementById("noGists").innerHTML = "Number of Gists: " + provided.public_gists;
		
		fetchRepos(provided.repos_url);
      
    }, 
	function(err) 
	{
     alert(err);
    });
	 
}


