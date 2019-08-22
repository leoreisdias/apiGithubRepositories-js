import api from './functions';

class app{
  constructor(){
    this.repositories = [];
    this.formElement = document.getElementById('repo-form');
    this.inputElement = document.querySelector('input[name=repository]');
    this.ulElement = document.getElementById('repo-list');

    this.registerEvent();
  }

  registerEvent(){
    this.formElement.onsubmit = event => this.addRepository(event);
  }

  async addRepository(event){
    event.preventDefault();

    const dataInput = this.inputElement.value;

    if(dataInput.lenght === 0)
      return;
    try{
      const response = await api.get(`/repos/${dataInput}`);

      const {name,description,html_url, avatar_url} = response.data;
      
      this.repositories.push({
        name,
        description,
        avatar_url,
        html_url
      })
      this.inputElement.value = '';

      this.render();
    }catch(err){
      window.alert('Repository did not found');
    }
  }

  render(){
    this.ulElement.innerHTML = '';

    this.repositories.forEach(repo => {
      if(repo.avatar_url === undefined)
        repo.avatar_url = './img/noimg.png';
        
      let imagemEl = document.createElement('img');
      imagemEl.setAttribute('src',repo.avatar_url);

      let titleEl = document.createElement('strong');
      titleEl.appendChild(document.createTextNode(repo.name));

      let descripEl = document.createElement('p');
      descripEl.appendChild(document.createTextNode(repo.description));

      let linkEl = document.createElement('a');
      linkEl.setAttribute('target','_blank');
      linkEl.setAttribute('href',repo.html_url);
      linkEl.appendChild(document.createTextNode('Acessar'));

      let itemEl = document.createElement('li');
      itemEl.appendChild(imagemEl);
      itemEl.appendChild(titleEl);
      itemEl.appendChild(descripEl);
      itemEl.appendChild(linkEl);
      
      this.ulElement.appendChild(itemEl);
    })
  }
}

new app();