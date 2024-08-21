var HomepageFR = React.createClass(
        
  {render: function() {
//=========================HOMEPAGE===============================
  return   <div className='ui text container'> 


      <h1 className='ui dividing header'>Langue et culture Lobi</h1>
      <h2 >Lobi dɪɪrɪ</h2>

      <div className="ui segment">
      <img className="ui medium spaced rounded image" src="./images/Anono_street.jpg"></img>
      <img className="ui medium spaced rounded image" src="./images/Blockhauss_ceremony.jpg"></img>
      </div>

    <p> Ce site est en construction. </p> 
  
    <p> Ce site Web est le fruit d'une collaboration entre Sansan Claude Hien et des linguistes de l'Université de Californie à Berkeley. </p>

    <p> Ce site Web est destiné avant tout à être une ressource pour le peuple Lobi, mais également pour les apprenants de tous horizons qui souhaitent en savoir plus sur la langue et la culture Lobi. <p>
    
    <h1 className='ui dividing header'>Membres du projet</h1>

    {/* <h2> (Visit the Storytellers page to learn more about the people who you see and hear in the texts.) </h2> */}

    <h3> Sansan Claude Hien </h3>
        <p> À déterminer </p> 

    <h3> Amber Galvano </h3>
        <p> <a href="https://ambergalvano.weebly.com/">Amber</a> est doctorante en linguistique à l'Université de Californie à Berkeley.  </p>

        </div>
        }
    }
)

export default HomepageFR;