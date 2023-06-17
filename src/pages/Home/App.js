import { useState } from 'react';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { CardRepo } from '../../components/CardRepo';
import backgroundImage from '../../images/background.svg';
import './styles.css'

function App() {

  const [user, setUser] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();
    
    if (newUser.name) {
      setCurrentUser(newUser);

      const reposData = await fetch(`https://api.github.com/users/${user}/repos`);
      const newRepos = await reposData.json();

      if(newRepos.length) {
        setRepos(newRepos);
      }
    }
  }

  return (
    <div className="App">
      <Header />
      <div className='content'>
        <img className='bg-image' src={backgroundImage} alt="github logo"></img>
        <section>
          <div className="search">
            <input name="usuario" value={user} onChange={(event) => setUser(event.target.value)} placeholder='@usuario' />
            <Button onClick={handleGetData} />
          </div>

        {currentUser?.name ? (
          <>
          <div className="profile">
            <img src={currentUser.avatar_url} alt='foto de perfil do usuário'></img>
            <div>
              <h3 className='profile-text'>{currentUser.name}</h3>
              <small className='profile-text'>{currentUser.login}</small>
              <p className='profile-text'>{currentUser.bio}</p>
            </div>
          </div>
          <hr></hr>
          </>
        ) : null}
        {repos?.length ? (
        <div className='repoList'>
          <h2>Repositórios</h2>
          {repos.map(repo => <CardRepo title={repo.name} description={repo.description ? repo.description : "Esse repositório não possui uma descrição"} url={repo.html_url}/>)}
        </div>
        ) : null}
        </section>
      </div>
    </div>
  );
}

export default App;
