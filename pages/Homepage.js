var Homepage = React.createClass(
        
  {render: function() {
//=========================HOMEPAGE===============================
  return   <div className='ui text container'> 


    <h1 className='ui dividing header'>Lobi language & culture</h1>
    <h2 >Lobi dɪɪrɪ</h2>

    <div className="ui segment">
    <img className="ui medium spaced rounded image" src="./images/Sansan_smiling.png"></img>
    <img className="ui medium spaced rounded image" src="./images/Sansan_serious.png"></img>
    </div>
        
    <p>This website is under construction.</p> 
  
    <p>This website is a collaboration between Sansan Claude Hien and linguists at the University of California, Berkeley. </p>
    
    <p>This website is intended first and foremost as a resource for the Lobi people, and in addition for learners of all backgrounds who are interested in learning more about Lobi language & culture. </p>
    
    <h1 className='ui dividing header'>Project members</h1>

    {/* <h2> (Visit the Storytellers page to learn more about the people who you see and hear in the texts.) </h2> */}

    <h3> Sansan Claude Hien </h3>
        <p> TBD </p> 

    <h3> Amber Galvano </h3>
        <p> <a href="https://ambergalvano.weebly.com/">Amber</a> is a Ph.D. student in Linguistics at UC Berkeley. </p>

      </div>
      }
  }
)

export default Homepage;
