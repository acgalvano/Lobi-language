//Bottom of this doc sets up page structure and references components created above
// import {Homepage} from './pages/Homepage.js'
// import "./pages/*.js"
// import {Homepage, HomepageFR, Orthography, Glosspage, StoryView, StoryViewFR} from './pages/index.js'

//Global variable for moro_click database
var global_id_to_morpheme_definition = [];
var global_id_to_row = {};
var global_whole_data;
var firstLoad = true;

//These are imports from ReactRouter o.13.x
//docs: https://github.com/rackt/react-router/blob/0.13.x/docs/guides/overview.md
var Link = ReactRouter.Link;
var RouteHandler = ReactRouter.RouteHandler;
var Route = ReactRouter.Route;
var Navigation = ReactRouter.Navigation;
var State = ReactRouter.State;
// const Homepage = lazy(() => import('./pages/Homepage.js'));

// These are endpoints to load data from.
// Loaded from static files in the repository rather than from lingsync.

// Static file with sentences.
var sentence_url = 'sentences.json';

// Static file with stories.
var story_url = 'narratives.json';

var global_show_french = true;

// Promise that is resolved once the sentence data is loaded
var raw_data_promise = new Promise(function(resolve, reject) {
  $.ajax({
      url: sentence_url,
      dataType: 'json',
      success: function(d) {
        resolve(d);
      },
      error: function(xhr, status, err) {
        console.error(sentence_url, status, err.toString());
          reject(err);}

    })
});

// Promise that is resolved once stories are loaded
var story_data_promise = new Promise(function(resolve, reject) {
  $.ajax({
      url: story_url,
      dataType: 'json',
      success: function(d) {
        resolve(d);
      },
      error: function(xhr, status, err) {
        console.error(sentence_url, status, err.toString());
          reject(err);}

    })
});

var sentence_data_promise = Promise.all([raw_data_promise,
                                          story_data_promise]).then(
  function(x) {
    var sentence_data = x[0];
    var story_data = x[1];
    var stories = _.reduce(story_data.rows, function(acc, x) {
      acc[x.key] = 1;
      return acc;
    }, {})
    return _.filter(sentence_data.rows, function(x) {return stories[x.key[0]] == 1;})
  }
);


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
        <p> Lobi speaker </p> 

    <h3> Amber Galvano </h3>
        <p> <a href="https://ambergalvano.weebly.com/">Amber</a> is a Ph.D. student in Linguistics at UC Berkeley. </p>

      </div>
      }
  }
)

var HomepageFR = React.createClass(
        
  {render: function() {
//=========================HOMEPAGE===============================
  return   <div className='ui text container'> 

    
    <h1 className='ui dividing header'>Langue et culture Lobi</h1>
    <h2 >Lobi dɪɪrɪ</h2>

    <div className="ui segment">
    <img className="ui medium spaced rounded image" src="./images/Sansan_smiling.png"></img>
    <img className="ui medium spaced rounded image" src="./images/Sansan_serious.png"></img>
    </div>

    <p> Ce site est en construction. </p> 
  
    <p> Ce site Web est le fruit d'une collaboration entre Sansan Claude Hien et des linguistes de l'Université de Californie à Berkeley. </p>

    <p> Ce site Web est destiné avant tout à être une ressource pour le peuple Lobi, mais également pour les apprenants de tous horizons qui souhaitent en savoir plus sur la langue et la culture Lobi. </p>
    
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

var Orthography = React.createClass(
        
  {render: function() {
      return   <div className='ui text container'>
          <h1 className='ui dividing header'>Orthography</h1>
          <h2 className='ortho dividing header'>Vowels</h2>
          <table className='ui unstackable celled table '>
          <thead>
            <tr><th>Sound</th>
            <th>English analogue</th>
            <th>Example in Lobi w/ English Translation</th>
          </tr></thead>

          <tbody>
          <tr>
            <td data-label="IPA">i</td>
            <td data-label="Orthography"></td>
            <td data-label="Example">s<b>íí</b> 'snake'; d<b>ìì</b> 'yesterday'</td>
          </tr>
          <tr>
            <td data-label="IPA">ĩ</td>
            <td data-label="Orthography"></td>
            <td data-label="Example">an<b>ĩ̀ĩ̀</b> ‘oil’; s<b>ĩ̀ĩ̀</b> ‘urine’</td>
          </tr>
          <tr>
            <td data-label="IPA">ɪ</td>
            <td data-label="Orthography"></td>
            <td data-label="Example">d<b>ɪɪ</b> 'village'; b<b>ɪ</b>ɛl 'one'</td>
          </tr>
          <tr>
              <td data-label="IPA">ɪ̃</td>
              <td data-label="Orthography"></td>
              <td data-label="Example">c<b>ɪ̃</b>ncɛ̃́nã́ 'flies'; <b>ɪ̃</b>nɛ̃ 'to come'</td>
          </tr>
          <tr>
            <td data-label="IPA">e</td>
            <td data-label="Orthography"></td>
            <td data-label="Example"><b>féé</b> (or fér) 'breath (noun)'; d<b>éé</b>kùn<sup>1</sup> 'joking ally'</td>
          </tr>
          <tr>
              <td data-label="IPA">ẽ</td>
              <td data-label="Orthography">-<sup>2</sup></td>
              <td data-label="Example">mɪ̃́ɪ̃̀n ɟ<b>ẽ́</b> 'my uncle'</td>
          </tr>
          <tr>
              <td data-label="IPA">ɛ</td>
              <td data-label="Orthography"></td>
              <td data-label="Example">kh<b>ɛ́</b>r 'woman'; p<b>ɛ́ɛ́</b> 'intestines'; ɓ<b>ɛ̀</b>ɓ<b>ɛ́</b> 'Kpèkpè'<sup>3</sup></td>
          </tr>
          <tr>
            <td data-label="IPA">ɛ̃</td>
            <td data-label="Orthography"></td>
            <td data-label="Example">ɲ<b>ɛ̃̀ɛ̃̀</b> 'arms'</td>
          </tr>
          <tr>
            <td data-label="IPA">a</td>
            <td data-label="Orthography"></td>
            <td data-label="Example">j’<b>àá</b> 'market; week'</td>
          </tr>
          <tr>
              <td data-label="IPA">ã</td>
              <td data-label="Orthography"></td>
              <td data-label="Example">b<b>ã́ã́</b>nbri 'bracelet'</td>
          </tr>
          <tr>
            <td data-label="IPA">u</td>
            <td data-label="Orthography"></td>
            <td data-label="Example">p<b>ù</b>r 'pigeon'</td>
          </tr>
          <tr>
              <td data-label="IPA">ũ</td>
              <td data-label="Orthography"></td>
              <td data-label="Example">k<b>ũ̀</b>(n) 'man, friend'</td>
          </tr>
          <tr>
              <td data-label="IPA">ʊ</td>
              <td data-label="Orthography"></td>
              <td data-label="Example">b<b>ʊ̀</b> 'goat'; c<b>ʊ́</b>lá 'pistachio'; ɟ<b>ʊ̀</b>r 'fufu'</td>
          </tr>
          <tr>
              <td data-label="IPA">ʊ̃</td>
              <td data-label="Orthography"></td>
              <td data-label="Example">á g<b>ʊ̃́</b>nɛ̃́ 'he climbed'</td>
          </tr>
          <tr>
              <td data-label="IPA">o</td>
              <td data-label="Orthography"></td>
              <td data-label="Example">l<b>ó</b>bi 'Lobi'; mĩ́ĩ̀ k<b>ó</b> 'my husband'</td>
          </tr>
          <tr>
              <td data-label="IPA">õ</td>
              <td data-label="Orthography"></td>
              <td data-label="Example">l<b>ṍṍ</b> 'door'</td>
          </tr>
          <tr>
              <td data-label="IPA">ɔ</td>
              <td data-label="Orthography"></td>
              <td data-label="Example"><b>ɔ̀</b>lɟ<b>ɔ́</b> 'corn'; l<b>ɔ́ɔ́</b>'farm'</td>
          </tr>
          <tr>
              <td data-label="IPA">ɔ̃</td>
              <td data-label="Orthography"></td>
              <td data-label="Example">g<b>ɔ̃́</b>gʊ̃́w<b>ɔ̃̀</b>(n) 'mountain'</td>
          </tr>
            
        </tbody>

        </table>

        <h5><sup>1</sup>Lobi people will use this to refer to members of other tribes, like the Bete, with whom they have a close relationship; it is also interpreted as “slave” but with a positive connotation, in the sense that they will be there for each other in difficult situations but they joke with each other about it.</h5>
        <h5><sup>2</sup>Slightly more nasal in Lobi.</h5>
        <h5><sup>3</sup> Sansan points out that [bɛbɛ́] is a common “mispronunciation” of [ɓɛɓɛ́], even by some Lobi people.</h5>

        <h2 className='ortho dividing header'>Consonants</h2>

        <table className='ui unstackable celled table '>
          <thead>
            <tr><th>Sound</th>
            <th>French analogue</th>
            <th>English Translations</th>
          </tr></thead>

          <tbody>
          <tr>
            <td data-label="IPA">p</td>
            <td data-label="Orthography"><b>p</b>lace</td>
            <td data-label="Example"><b>p</b>ar(a), ‘place’</td>
          </tr>
          <tr>
            <td data-label="IPA">pʰ</td>
            <td data-label="Orthography">–</td>
            <td data-label="Example"><b>pʰ</b>ʊɔ, ‘okra’</td>
          </tr>
          <tr>
            <td data-label="IPA">b</td>
            <td data-label="Orthography"><b>b</b>al</td>
            <td data-label="Example"><b>b</b>ɪɛl, ‘one’</td>
          </tr>
          <tr>
            <td data-label="IPA">ɓ<sup>4</sup></td>
            <td data-label="Orthography">–</td>
            <td data-label="Example"><b>ɓ</b>à<b>ɓ</b>ú, ‘eggplant’</td>
          </tr>
          <tr>
              <td data-label="IPA">t</td>
              <td data-label="Orthography"><b>t</b>aper</td>
              <td data-label="Example"><b>t</b>amɔ̃n, ‘one hundred, five hundred ($)’</td>
          </tr>
          <tr>
            <td data-label="IPA">tʰ</td>
            <td data-label="Orthography">–</td>
            <td data-label="Example"><b>tʰ</b>íí, ‘soil’</td>
          </tr>
          <tr>
              <td data-label="IPA">d</td>
              <td data-label="Orthography"><b>d</b>anse</td>
              <td data-label="Example"><b>d</b>ii, ‘yesterday’</td>
          </tr>
          <tr>
              <td data-label="IPA">c</td>
              <td data-label="Orthography">–<sup>5,6</sup></td>
              <td data-label="Example"><b>c</b>ʊɔr, ‘house’</td>
          </tr>
          <tr>
            <td data-label="IPA">ɟ</td>
            <td data-label="Orthography">≠ <b>j</b>oue (this has [ʒ])</td>
            <td data-label="Example"><b>ɟ</b>ɔ, ‘millet’</td>
          </tr>
          <tr>
              <td data-label="IPA">k</td>
              <td data-label="Orthography"><b>c</b>ou</td>
              <td data-label="Example"><b>k</b>ar, ‘hole’</td>
          </tr>
          <tr>
            <td data-label="IPA">kʰ</td>
            <td data-label="Orthography">–</td>
            <td data-label="Example"><b>kʰ</b>ɛ́r, ‘woman’</td>
          </tr>
          <tr>
              <td data-label="IPA">g</td>
              <td data-label="Orthography"><b>g</b>oût</td>
              <td data-label="Example"><b>gɔ̃́</b>gʊ̃́w<b>ɔ̃̀</b>(n) ‘mountain’</td>
          </tr>
          <tr>
              <td data-label="IPA">k͡p</td>
              <td data-label="Orthography">–</td>
              <td data-label="Example"><b>kp</b>a<b>kp</b>ál, ‘stranger, guest’<sup>7</sup></td>
          </tr>
          <tr>
              <td data-label="IPA">ɡ͡b<sup>8</sup></td>
              <td data-label="Orthography">–</td>
              <td data-label="Example"><b>ɡ͡b</b>àá, ‘cobra’</td>
          </tr>
          <tr>
              <td data-label="IPA">r<sup>9</sup></td>
              <td data-label="Orthography">–</td>
              <td data-label="Example">cʊɔ<b>r</b>, ‘house’</td>
          </tr>
          <tr>
              <td data-label="IPA">l</td>
              <td data-label="Orthography"><b>l</b>oup</td>
              <td data-label="Example"><b>l</b>úú, ‘forest’</td>
          </tr>
          <tr>
              <td data-label="IPA">l’ (or l<sup>ʔ</sup>)<sup>10</sup></td>
              <td data-label="Orthography">–</td>
              <td data-label="Example"><b>l’</b>úú, ‘traditional spoon’<sup>11</sup></td>
          </tr>
          <tr>
              <td data-label="IPA">j</td>
              <td data-label="Orthography">mo<b>y</b>en, ma<b>ill</b>ot</td>
              <td data-label="Example"><b>j</b>aná, ‘four’ (English: ‘<b>y</b>es’)</td>
          </tr>
          <tr>
              <td data-label="IPA">j’ (or j<sup>ʔ</sup>)</td>
              <td data-label="Orthography">–</td>
              <td data-label="Example"><b>j’</b>àá, ‘week, market/semaine, marché’</td>
          </tr>
          <tr>
            <td data-label="IPA">w</td>
            <td data-label="Orthography"><b>ou</b>i</td>
            <td data-label="Example"><b>w</b>ám, ‘small white hornbill’</td>
          </tr>
          <tr>
              <td data-label="IPA">w’ (or w<sup>ʔ</sup>)</td>
              <td data-label="Orthography"><b>ou</b>ïe</td>
              <td data-label="Example"><b>w’</b>ir, ‘cold’</td>
          </tr>
          <tr>
            <td data-label="IPA">m</td>
            <td data-label="Orthography"><b>m</b>ou</td>
            <td data-label="Example"><b>m</b>áádõ(n), ‘six’</td>
          </tr>
          <tr>
              <td data-label="IPA">n</td>
              <td data-label="Orthography"><b>n</b>ous</td>
              <td data-label="Example"><b>n</b>a, ‘cow’</td>
          </tr>
          <tr>
              <td data-label="IPA">ɲ</td>
              <td data-label="Orthography">bei<b>gn</b>e</td>
              <td data-label="Example"><b>ɲ</b>ɔ̃ɔ̃, ‘arm, hand’</td>
          </tr>
          <tr>
              <td data-label="IPA">f</td>
              <td data-label="Orthography"><b>f</b>ou</td>
              <td data-label="Example"><b>f</b>éé, ‘breath’</td>
          </tr>
          <tr>
            <td data-label="IPA">v</td>
            <td data-label="Orthography"><b>v</b>ous</td>
            <td data-label="Example"><b>v</b>ɔ́ɔ́-rɛ́, ‘be tired’</td>
          </tr>
          <tr>
              <td data-label="IPA">s</td>
              <td data-label="Orthography"><b>s</b>ous</td>
              <td data-label="Example"><b>s</b>íí, ‘snake</td>
          </tr>
          <tr>
            <td data-label="IPA">h</td>
            <td data-label="Orthography"><b>h</b>aine</td>
            <td data-label="Example"><b>h</b>ir, ‘be full’</td>
          </tr>
  
        </tbody>

        </table>

      <h5><sup>4</sup>/ɓ/ is an implosive stop to try making a swallowing motion/moving your “Adam’s apple” down while making the plain /l, j, w/ sounds
      </h5>
      <h5><sup>5</sup>Sometimes /k/ is pronounced like this, but it is not considered a phoneme in French
      </h5>
      <h5><sup>6</sup>Similar to but not the same as English /tʃ/ (e.g., choose); /c/ is a stop, while /tʃ/ is an affricate
      </h5>
      <h5><sup>7</sup>Lobi does not have grammatical gender so French translations can go either way
      </h5>
      <h5><sup>8</sup>/kp/ and /gb/ sound similar to /ɓ/ but the air does not actually go inward like an implosive; to make these, you need to literally make and release a velar and bilabial closure at the same time
      </h5>
      <h5><sup>9</sup>You’ll hear /r/ as a voiced trill or voiceless trill word-finally, or tapped word-medially; Sansan also varies</h5>
      <h5><sup>10</sup>The glottalized sonorants /l’, j’, w’/ are produced similarly to implosive /ɓ/</h5>
      <h5><sup>11</sup>Made from calabash and shaped like a ladle; kúr(ú)jer(i) (typical spoon, borrowing)</h5>

      
      </div>
  }
}
)

var OrthographyFR = React.createClass(
        
  {render: function() {
    return   <div className='ui text container'>
      <h1 className='ui dividing header'>Orthography</h1>
      <h2 className='ortho dividing header'>Vowels</h2>
      <table className='ui unstackable celled table '>
        <thead>
          <tr><th>Sound</th>
            <th>French analogue</th>
            <th>Example in Lobi (w/ French translations)</th>
          </tr></thead>

        <tbody>
          <tr>
            <td data-label="IPA">i</td>
            <td data-label="Orthography">m<b>il</b></td>
            <td data-label="Example">s<b>íí</b> 'serpent'; d<b>ìì</b>' hier'</td>
          </tr>
          <tr>
            <td data-label="IPA">ĩ</td>
            <td data-label="Orthography">d<b>i</b>gne</td>
            <td data-label="Example">an<b>ĩ̀ĩ̀</b> 'huile'; s<b>ĩ̀ĩ̀</b> 'urine'</td>
          </tr>
          <tr>
            <td data-label="IPA">ɪ</td>
            <td data-label="Orthography">m<b>i</b>el</td>
            <td data-label="Example">d<b>ɪɪ</b> 'village'; b<b>ɪ</b>ɛl 'un'</td>
          </tr>
          <tr>
            <td data-label="IPA">ɪ̃</td>
            <td data-label="Orthography">–</td>
            <td data-label="Example">c<b>ɪ̃</b>ncɛ̃́nã́ 'mouches'; <b>ɪ̃</b>nɛ̃ 'viens'</td>
          </tr>
          <tr>
            <td data-label="IPA">e</td>
            <td data-label="Orthography">f<b>é</b>e</td>
            <td data-label="Example"><b>féé</b> (or fér) 'respiration'; d<b>éé</b>kùn<sup>1</sup> 'allier a plaisantérie'</td>
          </tr>
          <tr>
            <td data-label="IPA">ẽ</td>
            <td data-label="Orthography">beign<b>e</b>t<sup>2</sup></td>
            <td data-label="Example">mɪ̃́ɪ̃̀n ɟ<b>ẽ́</b> 'mon oncle'</td>
          </tr>
          <tr>
            <td data-label="IPA">ɛ</td>
            <td data-label="Orthography">m<b>è</b>re</td>
            <td data-label="Example">kh<b>ɛ́</b>r 'femme'; p<b>ɛ́ɛ́</b> 'intestins'; ɓ<b>ɛ̀</b>ɓ<b>ɛ́</b> 'Kpèkpè'<sup>3</sup></td>
          </tr>
          <tr>
            <td data-label="IPA">ɛ̃</td>
            <td data-label="Orthography">m<b>ain</b></td>
            <td data-label="Example">ɲ<b>ɛ̃̀ɛ̃̀</b> 'mains'</td>
          </tr>
          <tr>
            <td data-label="IPA">a</td>
            <td data-label="Orthography">b<b>a</b>l</td>
            <td data-label="Example">b<b>a</b>l 'marchè; semaine'</td>
          </tr>
          <tr>
            <td data-label="IPA">ã</td>
            <td data-label="Orthography">mam<b>an</b></td>
            <td data-label="Example">b<b>ã́ã́</b>nbri 'bracelet'</td>
          </tr>
          <tr>
            <td data-label="IPA">u</td>
            <td data-label="Orthography">v<b>ou</b>s</td>
            <td data-label="Example">p<b>ù</b>r 'pigeon'</td>
          </tr>
          <tr>
            <td data-label="IPA">ũ</td>
            <td data-label="Orthography">-</td>
            <td data-label="Example">k<b>ũ̀</b>(n) 'garçon, ami(e)'</td>
          </tr>
          <tr>
            <td data-label="IPA">ʊ</td>
            <td data-label="Orthography">-</td>
            <td data-label="Example">b<b>ʊ̀</b> 'cabri'; c<b>ʊ́</b>lá 'pistache'; ɟ<b>ʊ̀</b>r 'foutou'</td>
          </tr>
          <tr>
            <td data-label="IPA">ʊ̃</td>
            <td data-label="Orthography">-</td>
            <td data-label="Example">á g<b>ʊ̃́</b>nɛ̃́ 'il est monté'</td>
          </tr>
          <tr>
            <td data-label="IPA">o</td>
            <td data-label="Orthography">m<b>o</b>t</td>
            <td data-label="Example">l<b>ó</b>bi 'Lobi'; mĩ́ĩ̀ k<b>ó</b> 'mon mari'</td>
          </tr>
          <tr>
            <td data-label="IPA">õ</td>
            <td data-label="Orthography">-</td>
            <td data-label="Example">l<b>ṍṍ</b> 'porte'</td>
          </tr>
          <tr>
            <td data-label="IPA">ɔ</td>
            <td data-label="Orthography">f<b>o</b>rce</td>
            <td data-label="Example"><b>ɔ̀</b>lɟ<b>ɔ́</b> 'maïs'; l<b>ɔ́ɔ́</b> 'champ'</td>
        </tr>
        <tr>
          <td data-label="IPA">ɔ̃</td>
          <td data-label="Orthography">m<b>on</b>tagne</td>
          <td data-label="Example">g<b>ɔ̃́</b>gʊ̃́w<b>ɔ̃̀</b>(n) 'montagne'</td>
        </tr>
          
        </tbody>
        
      </table>
      
        <h5><sup>1</sup>Les Lobi s'en serviront pour désigner des membres d'autres tribus, comme les Bété, avec lesquels ils entretiennent des relations étroites; c'est aussi interprété comme "esclave" mais avec une connotation positive, en ce sens qu'ils seront là l'un pour l'autre dans des situations difficiles mais ils plaisantent à ce sujet.</h5>
        <h5><sup>2</sup>Un peu plus nasal à Lobi.</h5>
        <h5><sup>3</sup>Sansan souligne que [bɛbɛ́] est une « mauvaise prononciation » courante de [ɓɛɓɛ́], même par certains Lobi.</h5>

    </table><h2 className='ortho dividing header'>Consonants</h2><table className='ui unstackable celled table '>
        <thead>
          <tr><th>Sound</th>
            <th>French analogue</th>
            <th>Example in Lobi w/ French translations</th>
          </tr></thead>

        <tbody>
          <tr>
            <td data-label="IPA">p</td>
            <td data-label="Orthography"><b>p</b>lace</td>
            <td data-label="Example"><b>p</b>ar(a), ‘place, lieu’</td>
          </tr>
          <tr>
            <td data-label="IPA">pʰ</td>
            <td data-label="Orthography">–</td>
            <td data-label="Example"><b>pʰ</b>ʊɔ, ‘gombo’</td>
          </tr>
          <tr>
            <td data-label="IPA">b</td>
            <td data-label="Orthography"><b>b</b>al</td>
            <td data-label="Example"><b>b</b>ɪɛl, ‘un’</td>
          </tr>
          <tr>
            <td data-label="IPA">ɓ<sup>4</sup></td>
            <td data-label="Orthography">–</td>
            <td data-label="Example"><b>ɓ</b>à<b>ɓ</b>ú, ‘aubergine’</td>
          </tr>
          <tr>
            <td data-label="IPA">t</td>
            <td data-label="Orthography"><b>t</b>aper</td>
            <td data-label="Example"><b>t</b>amɔ̃n, ‘cent, cinc cents ($)’</td>
          </tr>
          <tr>
            <td data-label="IPA">tʰ</td>
            <td data-label="Orthography">–</td>
            <td data-label="Example"><b>tʰ</b>íí, ‘solterre’</td>
          </tr>
          <tr>
            <td data-label="IPA">d</td>
            <td data-label="Orthography"><b>d</b>anse</td>
            <td data-label="Example"><b>d</b>ii, ‘hier’</td>
          </tr>
          <tr>
            <td data-label="IPA">c</td>
            <td data-label="Orthography">–<sup>5,6</sup></td>
            <td data-label="Example"><b>c</b>ʊɔr, ‘maison’</td>
          </tr>
          <tr>
            <td data-label="IPA">ɟ</td>
            <td data-label="Orthography">≠ <b>j</b>oue (this has [ʒ])</td>
            <td data-label="Example"><b>ɟ</b>ɔ, ‘millet’</td>
          </tr>
          <tr>
            <td data-label="IPA">k</td>
            <td data-label="Orthography"><b>c</b>ou</td>
            <td data-label="Example"><b>k</b>ar, ‘trou’</td>
          </tr>
          <tr>
            <td data-label="IPA">kʰ</td>
            <td data-label="Orthography">–</td>
            <td data-label="Example"><b>kʰ</b>ɛ́r, ‘femme’</td>
          </tr>
          <tr>
            <td data-label="IPA">g</td>
            <td data-label="Orthography"><b>g</b>oût</td>
            <td data-label="Example"><b>gɔ̃́</b>gʊ̃́w<b>ɔ̃̀</b>(n) ‘montagne’</td>
          </tr>
          <tr>
            <td data-label="IPA">k͡p</td>
            <td data-label="Orthography">–</td>
            <td data-label="Example"><b>kp</b>a<b>kp</b>ál, ‘étranger, invité’<sup>7</sup></td>
          </tr>
          <tr>
            <td data-label="IPA">ɡ͡b<sup>8</sup></td>
            <td data-label="Orthography">–</td>
            <td data-label="Example"><b>ɡ͡b</b>àá, ‘cobra’</td>
          </tr>
          <tr>
            <td data-label="IPA">r<sup>9</sup></td>
            <td data-label="Orthography">–</td>
            <td data-label="Example">cʊɔ<b>r</b>, ‘maison’</td>
          </tr>
          <tr>
            <td data-label="IPA">l</td>
            <td data-label="Orthography"><b>l</b>oup</td>
            <td data-label="Example"><b>l</b>úú, ‘forêt’</td>
          </tr>
          <tr>
            <td data-label="IPA">l’ (or l<sup>ʔ</sup>)<sup>10</sup></td>
            <td data-label="Orthography">–</td>
            <td data-label="Example"><b>l’</b>úú, ‘cuillère traditionnelle/louche’<sup>11</sup></td>
          </tr>
          <tr>
            <td data-label="IPA">j</td>
            <td data-label="Orthography">mo<b>y</b>en, ma<b>ill</b>ot</td>
            <td data-label="Example"><b>j</b>aná, ‘quatre’</td>
          </tr>
          <tr>
            <td data-label="IPA">j’ (or j<sup>ʔ</sup>)</td>
            <td data-label="Orthography">–</td>
            <td data-label="Example"><b>j’</b>àá, ‘semaine, marché’</td>
          </tr>
          <tr>
            <td data-label="IPA">w</td>
            <td data-label="Orthography"><b>ou</b>i</td>
            <td data-label="Example"><b>w</b>ám, ‘petit calao blanc’</td>
          </tr>
          <tr>
            <td data-label="IPA">w’ (or w<sup>ʔ</sup>)</td>
            <td data-label="Orthography"><b>ou</b>ïe</td>
            <td data-label="Example"><b>w’</b>ir, ‘froid’</td>
          </tr>
          <tr>
            <td data-label="IPA">m</td>
            <td data-label="Orthography"><b>m</b>ou</td>
            <td data-label="Example"><b>m</b>áádõ(n), ‘six’</td>
          </tr>
          <tr>
            <td data-label="IPA">n</td>
            <td data-label="Orthography"><b>n</b>ous</td>
            <td data-label="Example"><b>n</b>a, ‘vache’</td>
          </tr>
          <tr>
            <td data-label="IPA">ɲ</td>
            <td data-label="Orthography">bei<b>gn</b>e</td>
            <td data-label="Example"><b>ɲ</b>ɔ̃ɔ̃, ‘bras, main’</td>
          </tr>
          <tr>
            <td data-label="IPA">f</td>
            <td data-label="Orthography"><b>f</b>ou</td>
            <td data-label="Example"><b>f</b>éé, ‘souffle’</td>
          </tr>
          <tr>
            <td data-label="IPA">v</td>
            <td data-label="Orthography"><b>v</b>ous</td>
            <td data-label="Example"><b>v</b>ɔ́ɔ́-rɛ́, ‘être fatigué’</td>
          </tr>
          <tr>
            <td data-label="IPA">s</td>
            <td data-label="Orthography"><b>s</b>ous</td>
            <td data-label="Example"><b>s</b>íí, ‘serpent’</td>
          </tr>
          <tr>
            <td data-label="IPA">h</td>
            <td data-label="Orthography"><b>h</b>aine</td>
            <td data-label="Example"><b>h</b>ir, ‘être rassasié’</td>
          </tr>

        </tbody>

      </table>

      <h5><sup>4</sup>/ɓ/ is an implosive stop to try making a swallowing motion/moving your “Adam’s apple” down while making the plain /l, j, w/ sounds
      </h5>
      <h5><sup>5</sup>Sometimes /k/ is pronounced like this, but it is not considered a phoneme in French
      </h5>
      <h5><sup>6</sup>Similar to but not the same as English /tʃ/ (e.g., choose); /c/ is a stop, while /tʃ/ is an affricate
      </h5>
      <h5><sup>7</sup>Lobi does not have grammatical gender so French translations can go either way
      </h5>
      <h5><sup>8</sup>/kp/ and /gb/ sound similar to /ɓ/ but the air does not actually go inward like an implosive; to make these, you need to literally make and release a velar and bilabial closure at the same time
      </h5>
      <h5><sup>9</sup>You’ll hear /r/ as a voiced trill or voiceless trill word-finally, or tapped word-medially; Sansan also varies</h5>
      <h5><sup>10</sup>The glottalized sonorants /l’, j’, w’/ are produced similarly to implosive /ɓ/</h5>
      <h5><sup>11</sup>Made from calabash and shaped like a ladle; kúr(ú)jer(i) (typical spoon, borrowing)</h5>
    
    </div>
  }
  }
)

//React Class for a single story view
var StoryView = React.createClass({
  //React object state
  //
  //sentence: loaded flag and sentence data
  //story: loaded flag and story data
  //show_gloss: flag true if we show interlinear gloss lines
  getInitialState: function() {
    return {sentence: {data: [], loaded: false},
            story: {data: [], loaded: false},
            show_gloss: false,
            story_view: false, 
            french_view: true, // EDIT: added french toggle
            french_story: {data: [], loaded: false}
            };
  },
  //queue uploading of story and sentence data when this component is mounted
  componentDidMount: function() {
    story_data_promise.then(function(rawdata){
      this.setState({story:{data: rawdata.rows, loaded: true}});
    }.bind(this));

    sentence_data_promise.then(function(sentences){
      this.setState({sentence:{data: sentences, loaded: true}});
    }.bind(this));
  },
  //only ready to display story when story and sentence data have loaded
  loaded: function() {
    return this.state.story.loaded && this.state.sentence.loaded;
  },
  // Get the story object
  getStory: function() {
    var arr = this.state.story.data;
    for (var i = 0; i < arr.length; i++) {
      var o = arr[i];
      if (o.key == this.props.params.key) {
        return  o.value;
      }
    }
    return {};
  },
  //return name of story by searching story data for this story's id
  getStoryName: function() {
    return _.get(this.getStory(), 'name', "<Unknown Story>");
  },
  getStoryName_fr: function() {
    return _.get(this.getStory(), 'name_fr', "<Unknown Story>");
  },
  //return author of story by searching story data for this story's id
  getStoryAuthor: function() {
    return _.get(this.getStory(), 'author', "");
  },
  //toggles interlinear gloss or not
  toggleGloss: function() {
    var new_show_gloss = !this.state.show_gloss;
    var new_story_view = this.state.story_view;
    if(new_show_gloss) {
      new_story_view = false;
    }
    this.setState({show_gloss: new_show_gloss,
                    story_view: new_story_view});
  },
  //toggles story view
  toggleStoryView: function() {
    var new_show_gloss = this.state.show_gloss;
    var new_story_view = !this.state.story_view;
    var new_french_view = this.state.french_view; // EDIT
    if(new_story_view) {
      new_show_gloss = false;
    }
    this.setState({show_gloss: new_show_gloss,
                    story_view: new_story_view,
                    french_view: new_french_view}); // EDIT
  },
  //renders component
  render: function() {
    // If we haven't loaded yet, just render the dimmer.
    if (!this.loaded()) {
      return <div className="ui active dimmer">
        <div className="ui text loader">Loading</div>
      </div>;
    }
    // process sentence data to render alignment of morphemes/glosses and show one clause per line
    // lodash chaining: https://lodash.com/docs#_
    var sentences;
    var story_sentences = _(this.state.sentence.data).filter(
      // render sentences from this story
      function(x){
        return x.value.story == this.props.params.key;
      }.bind(this)
    );
    if (this.state.story_view) {
      var sentence_rows = story_sentences.map(
        function(x) {
            return [
              (
                <div key={x.key + "-1"} className="eight wide column"
                    style={{"padding": "0px"}}>
                  <Sentence sentence={x.value.sentence}
                            only_utterance="true" />
                </div>
              ),
              (
                <div key={x.key + "-2"} className="eight wide column"
                    style={{"padding": "0px"}}>
                  <Sentence sentence={x.value.sentence}
                            only_translation="true" />
                </div>
              )
            ];
        }.bind(this)
      ).value();
      
      sentences = (
        <div className='ui text container'
            style={{"padding-top": "14px"}}>
          <div className="ui grid">
            <div className="eight wide column"
                style={{"padding": "0px"}}>
                <h2>Atchan</h2>
            </div>
            <div className="eight wide column"
                style={{"padding": "0px"}}>
                <h2>English</h2>
            </div>
          {sentence_rows}
          </div>
        </div>
      );
      // }
    } else {
      sentences = story_sentences.map(
        // how to render a sentence
        function(x){
          return <Sentence key={x.key}
                    sentence={x.value.sentence}
                    show_gloss={this.state.show_gloss}/>;
        }.bind(this)
      ).value();
    }
    // render story content page with title and checkbox to toggle interlinear gloss display
    // if (self.state.french_view) {
    //   story_name = this.getStoryName_fr();
    // }
    // else {story_name = this.getStoryName();}
    return (
      <div>
        <h1>{this.getStoryName()}</h1> by {this.getStoryAuthor()} <div className="ui form">

          <div className="grouped fields">
            <label>View Options</label>

            <div className="field">
              <div className="ui slider checkbox">
                <input type="radio" name="throughput" checked={this.state.show_gloss} onChange={this.toggleGloss}> </input>
                <label>Show Glosses</label>
              </div>
            </div>

            <div className="field">
              <div className="ui slider checkbox">
                <input type="radio" name="throughput" checked={this.state.story_view} onChange={this.toggleStoryView}> </input>
                <label>Story View</label>
              </div>
            </div>

            <iframe width="560" height="315" 
            src={this.getStoryURL()}
            title="YouTube video player" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>
            </iframe>
          
          </div>
        </div>
        {sentences}
      </div>
    );

  }
});

var StoryViewFR = React.createClass({
  //React object state
  //
  //sentence: loaded flag and sentence data
  //story: loaded flag and story data
  //show_gloss: flag true if we show interlinear gloss lines
  getInitialState: function() {
    return {sentence: {data: [], loaded: false},
            story: {data: [], loaded: false},
            show_gloss: false,
            story_view: false, 
            french_view: true, // EDIT: added french toggle
            french_story: {data: [], loaded: false}
            };
  },
  //queue uploading of story and sentence data when this component is mounted
  componentDidMount: function() {
    story_data_promise.then(function(rawdata){
      this.setState({story:{data: rawdata.rows, loaded: true}});
    }.bind(this));

    sentence_data_promise.then(function(sentences){
      this.setState({sentence:{data: sentences, loaded: true}});
    }.bind(this));
  },
  //only ready to display story when story and sentence data have loaded
  loaded: function() {
    return this.state.story.loaded && this.state.sentence.loaded;
  },
  // Get the story object
  getStory: function() {
    var arr = this.state.story.data;
    for (var i = 0; i < arr.length; i++) {
      var o = arr[i];
      if (o.key == this.props.params.key) {
        return  o.value;
      }
    }
    return {};
  },
  //return name of story by searching story data for this story's id
  getStoryName: function() {
    if (this.state.french_view) {
      return _.get(this.getStory(), 'name_fr', "<Unknown Story>");
    }
    return _.get(this.getStory(), 'name', "<Unknown Story>");
  },
  //return author of story by searching story data for this story's id
  getStoryAuthor: function() {
    return _.get(this.getStory(), 'author', "");
  },
  //toggles interlinear gloss or not
  toggleGloss: function() {
    var new_show_gloss = !this.state.show_gloss;
    var new_story_view = this.state.story_view;
    if(new_show_gloss) {
      new_story_view = false;
    }
    this.setState({show_gloss: new_show_gloss,
                    story_view: new_story_view});
  },
  //toggles story view
  toggleStoryView: function() {
    var new_show_gloss = this.state.show_gloss;
    var new_story_view = !this.state.story_view;
    // var new_french_view = this.state.french_view; // EDIT
    if(new_story_view) {
      new_show_gloss = false;
    }
    this.setState({show_gloss: new_show_gloss,
                    story_view: new_story_view,
                    french_view: global_show_french}); // EDIT
  },
  //renders component
  render: function() {
    // If we haven't loaded yet, just render the dimmer.
    if (!this.loaded()) {
      return <div className="ui active dimmer">
        <div className="ui text loader">Loading</div>
      </div>;
    }
    // process sentence data to render alignment of morphemes/glosses and show one clause per line
    // lodash chaining: https://lodash.com/docs#_
    var sentences;
    var story_sentences = _(this.state.sentence.data).filter(
      // render sentences from this story
      function(x){
        return x.value.story == this.props.params.key;
      }.bind(this)
    );
    if (this.state.story_view) {
      if (this.state.french_view) {
        language = 'French';
        var sentence_rows = story_sentences.map(
          function(x) {
              return [
                (
                  <div key={x.key + "-1"} className="eight wide column"
                        style={{"padding": "0px"}}>
                    <Sentence sentence={x.value.sentence}
                              only_utterance="true" />
                  </div>
                ),
                (
                  <div key={x.key + "-2"} className="eight wide column"
                        style={{"padding": "0px"}}>
                    <Sentence sentence={x.value.sentence}
                              only_french="true" />
                  </div>
                )
              ];
          }.bind(this)
        ).value();
      }
      sentences = (
        <div className='ui text container'
            style={{"padding-top": "14px"}}>
          <div className="ui grid">
            <div className="eight wide column"
                style={{"padding": "0px"}}>
                <h2>Atchan</h2>
            </div>
            <div className="eight wide column"
                style={{"padding": "0px"}}>
                <h2>French</h2>
            </div>
          {sentence_rows}
          </div>
        </div>
      );
      // }
    } else {
      sentences = story_sentences.map(
        // how to render a sentence
        function(x){
          return <Sentence key={x.key}
                    sentence={x.value.sentence}
                    show_gloss={this.state.show_gloss}/>;
        }.bind(this)
      ).value();
    }
    // render story content page with title and checkbox to toggle interlinear gloss display
    // if (self.state.french_view) {
    //   story_name = this.getStoryName_fr();
    // }
    // else {story_name = this.getStoryName();}
    return (
      <div>
        <h1>{this.getStoryName()}</h1> de {this.getStoryAuthor()} <div className="ui form">

          <div className="grouped fields">
            <label>View Options</label>

            <div className="field">
              <div className="ui slider checkbox">
                <input type="radio" name="throughput" checked={this.state.show_gloss} onChange={this.toggleGloss}> </input>
                <label>Show Glosses</label>
              </div>
            </div>

            <div className="field">
              <div className="ui slider checkbox">
                <input type="radio" name="throughput" checked={this.state.story_view} onChange={this.toggleStoryView}> </input>
                <label>Story View</label>
              </div>
            </div>

            <iframe width="560" height="315" 
            src="https://www.youtube.com/embed/fMIiQwCIzGQ?si=d3gMisqGeOdMJyw1" 
            title="YouTube video player" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>
            </iframe>
          
          </div>
        </div>
        {sentences}
      </div>
    );

  }
});

var Glosspage = React.createClass(
        
  {render: function() {
//=========================GLOSS PAGE===============================
  return   <div className='ui text container'> 

The abbreviations below are used for glossing in the Atchan texts and Atchan concordance.

      <h1 className='ui dividing header'>Abbreviations</h1>

        <div className='ui two column left aligned grid'>
          <div className='two wide column'>1sg</div>
          <div className='fourteen wide column'>1st person singular subject agreement</div>
          <div className='two wide column'>1du</div>
          <div className='fourteen wide column'>1st person dual inclusive subject agreement</div>
          <div className='two wide column'>1in</div>
          <div className='fourteen wide column'>1st person plural inclusive subject agreement</div>
          <div className='two wide column'>1ex</div>
          <div className='fourteen wide column'>1st person plural exclusive subject agreement</div>
          <div className='two wide column'>2sg</div>
          <div className='fourteen wide column'>2nd person singular subject agreement</div>
          <div className='two wide column'>2sg.inf</div>
          <div className='fourteen wide column'>Infinitive 2nd person singular subject agreement</div>
          <div className='two wide column'>2pl</div>
          <div className='fourteen wide column'>2nd person plural subject agreement</div>
          <div className='two wide column'>3sg.inf</div>
          <div className='fourteen wide column'>Infinitive 3rd person singular subject agreement</div>
          <div className='two wide column'>acc</div>
          <div className='fourteen wide column'>Accusative case</div>
          <div className='two wide column'>ap</div>
          <div className='fourteen wide column'>Antipassive</div>
          <div className='two wide column'>appl</div>
          <div className='fourteen wide column'>Applicative</div>
          <div className='two wide column'>assoc.pl</div>
          <div className='fourteen wide column'>Associative plural</div>
          <div className='two wide column'>be.rt</div>
          <div className='fourteen wide column'>Predicative copula</div>
          <div className='two wide column'>be.loc</div>
          <div className='fourteen wide column'>Locative copula</div>
          <div className='two wide column'>be.1d</div>
          <div className='fourteen wide column'>Deictic copula: be here</div>
          <div className='two wide column'>be.2d</div>
          <div className='fourteen wide column'>Deictic copula: be there</div>
          <div className='two wide column'>be.3d</div>
          <div className='fourteen wide column'>Deictic copula: be yonder</div>
          <div className='two wide column'>be.eq</div>
          <div className='fourteen wide column'>Equative copula</div>
          <div className='two wide column'>appl</div>
          <div className='fourteen wide column'>Applicative</div>
          <div className='two wide column'>caus</div>
          <div className='fourteen wide column'>Causative</div>
          <div className='two wide column'>clg</div>
          <div className='fourteen wide column'>Noun class agreement/concord: class g (sg/pl)</div>
          <div className='two wide column'>cll</div>
          <div className='fourteen wide column'>Noun class agreement/concord: class l (sg/pl)</div>
          <div className='two wide column'>cly</div>
          <div className='fourteen wide column'>Noun class agreement/concord: class n (pl)</div>
          <div className='two wide column'>clŋ</div>
          <div className='fourteen wide column'>Noun class agreement/concord: class ŋ (sg/pl)</div>
          <div className='two wide column'>clɲ</div>
          <div className='fourteen wide column'>Noun class agreement/concord: class ɲ (pl)</div>
          <div className='two wide column'>clr</div>
          <div className='fourteen wide column'>Noun class agreement/concord: class r (pl)</div>
          <div className='two wide column'>clð</div>
          <div className='fourteen wide column'>Noun class agreement/concord: class ð (sg)</div>
          <div className='two wide column'>clð.nom</div>
          <div className='fourteen wide column'>Nominalization prefix: class ð</div>
          <div className='two wide column'>cly</div>
          <div className='fourteen wide column'>Noun class agreement/concord: class y (sg/pl)</div>
          <div className='two wide column'>cmp</div>
          <div className='fourteen wide column'>Comparative</div>
          <div className='two wide column'>comp1</div>
          <div className='fourteen wide column'>Finite complementizer</div>
          <div className='two wide column'>comp1b</div>
          <div className='fourteen wide column'>Consecutive imperfective complementizer</div>
          <div className='two wide column'>comp2</div>
          <div className='fourteen wide column'>Infinitive and consecutive perfective complementizer</div>
          <div className='two wide column'>cmp</div>
          <div className='fourteen wide column'>Comparative</div>
          <div className='two wide column'>d.ipfv</div>
          <div className='fourteen wide column'>Distal imperfective</div>
          <div className='two wide column'>d.inf1</div>
          <div className='fourteen wide column'>Distal infinitive 1</div>
          <div className='two wide column'>d.inf2</div>
          <div className='fourteen wide column'>Distal infinitive 2</div>
          <div className='two wide column'>d.imp</div>
          <div className='fourteen wide column'>Distal imperative</div>
          <div className='two wide column'>dpc</div>
          <div className='fourteen wide column'>Finite dependent clause vowel</div>
          <div className='two wide column'>foc</div>
          <div className='fourteen wide column'>Focus cleft</div>
          <div className='two wide column'>fut.aux</div>
          <div className='fourteen wide column'>Future auxiliary</div>
          <div className='two wide column'>imp</div>
          <div className='fourteen wide column'>Imperative</div>
          <div className='two wide column'>indef</div>
          <div className='fourteen wide column'>Indefinite</div>
          <div className='two wide column'>inf1</div>
          <div className='fourteen wide column'>Infinitive 1</div>
          <div className='two wide column'>inf2</div>
          <div className='fourteen wide column'>Infinitive 2</div>
          <div className='two wide column'>inst</div>
          <div className='fourteen wide column'>Instrumental clitic</div>
          <div className='two wide column'>ipfv</div>
          <div className='fourteen wide column'>Imperfective</div>
          <div className='two wide column'>iter</div>
          <div className='fourteen wide column'>Iterative/durative aspect</div>
          <div className='two wide column'>juss</div>
          <div className='fourteen wide column'>Jussive</div>
          <div className='two wide column'>loc</div>
          <div className='fourteen wide column'>Locative</div>
          <div className='two wide column'>loc.appl</div>
          <div className='fourteen wide column'>Locative applicative</div>
          <div className='two wide column'>not.aux</div>
          <div className='fourteen wide column'>Negative auxiliary</div>
          <div className='two wide column'>om</div>
          <div className='fourteen wide column'>Object marker (object pronouns)</div>
          <div className='two wide column'>pass</div>
          <div className='fourteen wide column'>Passive</div>
          <div className='two wide column'>past.aux</div>
          <div className='fourteen wide column'>Past tense auxiliary</div>
          <div className='two wide column'>pfv</div>
          <div className='fourteen wide column'>Perfective</div>
          <div className='two wide column'>plz</div>
          <div className='fourteen wide column'>Politeness marker</div>
          <div className='two wide column'>poss</div>
          <div className='fourteen wide column'>Possessive/genitive</div>
          <div className='two wide column'>pro</div>
          <div className='fourteen wide column'>Pronoun</div>
          <div className='two wide column'>prog</div>
          <div className='fourteen wide column'>Progressive</div>
          <div className='two wide column'>prog.aux</div>
          <div className='fourteen wide column'>Progressive auxiliary</div>
          <div className='two wide column'>rtc</div>
          <div className='fourteen wide column'>Finite root clause vowel</div>
          <div className='two wide column'>sclg</div>
          <div className='fourteen wide column'>Strong (definite) noun class concord: class g (sg/pl)</div>
          <div className='two wide column'>scll</div>
          <div className='fourteen wide column'>Strong (definite) noun class concord: class l (sg/pl)</div>
          <div className='two wide column'>scly</div>
          <div className='fourteen wide column'>Strong (definite) noun class concord: class n (pl)</div>
          <div className='two wide column'>sclŋ</div>
          <div className='fourteen wide column'>Strong (definite) noun class concord: class ŋ (sg/pl)</div>
          <div className='two wide column'>sclɲ</div>
          <div className='fourteen wide column'>Strong (definite) noun class concord: class ɲ (pl)</div>
          <div className='two wide column'>sclr</div>
          <div className='fourteen wide column'>Strong (definite) noun class concord: class r (pl)</div>
          <div className='two wide column'>sclð</div>
          <div className='fourteen wide column'>Strong (definite) noun class concord: class ð (sg)</div>
          <div className='two wide column'>scly</div>
          <div className='fourteen wide column'>Strong (definite) noun class concord: class y (sg/pl)</div>
          <div className='two wide column'>way</div>
          <div className='fourteen wide column'>Manner clitic suffix</div>
          <div className='two wide column'>ynq</div>
          <div className='fourteen wide column'>Yes/no question marker</div>
        </div>
    </div>
  }
  }
)

var GlosspageFR = React.createClass(
        
  {render: function() {
//=========================GLOSS PAGE===============================
  return   <div className='ui text container'> 

The abbreviations below are used for glossing in the Atchan texts and Atchan concordance.

      <h1 className='ui dividing header'>Abbreviations</h1>

        <div className='ui two column left aligned grid'>
          <div className='two wide column'>1sg</div>
          <div className='fourteen wide column'>1st person singular subject agreement</div>
          <div className='two wide column'>1du</div>
          <div className='fourteen wide column'>1st person dual inclusive subject agreement</div>
          <div className='two wide column'>1in</div>
          <div className='fourteen wide column'>1st person plural inclusive subject agreement</div>
          <div className='two wide column'>1ex</div>
          <div className='fourteen wide column'>1st person plural exclusive subject agreement</div>
          <div className='two wide column'>2sg</div>
          <div className='fourteen wide column'>2nd person singular subject agreement</div>
          <div className='two wide column'>2sg.inf</div>
          <div className='fourteen wide column'>Infinitive 2nd person singular subject agreement</div>
          <div className='two wide column'>2pl</div>
          <div className='fourteen wide column'>2nd person plural subject agreement</div>
          <div className='two wide column'>3sg.inf</div>
          <div className='fourteen wide column'>Infinitive 3rd person singular subject agreement</div>
          <div className='two wide column'>acc</div>
          <div className='fourteen wide column'>Accusative case</div>
          <div className='two wide column'>ap</div>
          <div className='fourteen wide column'>Antipassive</div>
          <div className='two wide column'>appl</div>
          <div className='fourteen wide column'>Applicative</div>
          <div className='two wide column'>assoc.pl</div>
          <div className='fourteen wide column'>Associative plural</div>
          <div className='two wide column'>be.rt</div>
          <div className='fourteen wide column'>Predicative copula</div>
          <div className='two wide column'>be.loc</div>
          <div className='fourteen wide column'>Locative copula</div>
          <div className='two wide column'>be.1d</div>
          <div className='fourteen wide column'>Deictic copula: be here</div>
          <div className='two wide column'>be.2d</div>
          <div className='fourteen wide column'>Deictic copula: be there</div>
          <div className='two wide column'>be.3d</div>
          <div className='fourteen wide column'>Deictic copula: be yonder</div>
          <div className='two wide column'>be.eq</div>
          <div className='fourteen wide column'>Equative copula</div>
          <div className='two wide column'>appl</div>
          <div className='fourteen wide column'>Applicative</div>
          <div className='two wide column'>caus</div>
          <div className='fourteen wide column'>Causative</div>
          <div className='two wide column'>clg</div>
          <div className='fourteen wide column'>Noun class agreement/concord: class g (sg/pl)</div>
          <div className='two wide column'>cll</div>
          <div className='fourteen wide column'>Noun class agreement/concord: class l (sg/pl)</div>
          <div className='two wide column'>cly</div>
          <div className='fourteen wide column'>Noun class agreement/concord: class n (pl)</div>
          <div className='two wide column'>clŋ</div>
          <div className='fourteen wide column'>Noun class agreement/concord: class ŋ (sg/pl)</div>
          <div className='two wide column'>clɲ</div>
          <div className='fourteen wide column'>Noun class agreement/concord: class ɲ (pl)</div>
          <div className='two wide column'>clr</div>
          <div className='fourteen wide column'>Noun class agreement/concord: class r (pl)</div>
          <div className='two wide column'>clð</div>
          <div className='fourteen wide column'>Noun class agreement/concord: class ð (sg)</div>
          <div className='two wide column'>clð.nom</div>
          <div className='fourteen wide column'>Nominalization prefix: class ð</div>
          <div className='two wide column'>cly</div>
          <div className='fourteen wide column'>Noun class agreement/concord: class y (sg/pl)</div>
          <div className='two wide column'>cmp</div>
          <div className='fourteen wide column'>Comparative</div>
          <div className='two wide column'>comp1</div>
          <div className='fourteen wide column'>Finite complementizer</div>
          <div className='two wide column'>comp1b</div>
          <div className='fourteen wide column'>Consecutive imperfective complementizer</div>
          <div className='two wide column'>comp2</div>
          <div className='fourteen wide column'>Infinitive and consecutive perfective complementizer</div>
          <div className='two wide column'>cmp</div>
          <div className='fourteen wide column'>Comparative</div>
          <div className='two wide column'>d.ipfv</div>
          <div className='fourteen wide column'>Distal imperfective</div>
          <div className='two wide column'>d.inf1</div>
          <div className='fourteen wide column'>Distal infinitive 1</div>
          <div className='two wide column'>d.inf2</div>
          <div className='fourteen wide column'>Distal infinitive 2</div>
          <div className='two wide column'>d.imp</div>
          <div className='fourteen wide column'>Distal imperative</div>
          <div className='two wide column'>dpc</div>
          <div className='fourteen wide column'>Finite dependent clause vowel</div>
          <div className='two wide column'>foc</div>
          <div className='fourteen wide column'>Focus cleft</div>
          <div className='two wide column'>fut.aux</div>
          <div className='fourteen wide column'>Future auxiliary</div>
          <div className='two wide column'>imp</div>
          <div className='fourteen wide column'>Imperative</div>
          <div className='two wide column'>indef</div>
          <div className='fourteen wide column'>Indefinite</div>
          <div className='two wide column'>inf1</div>
          <div className='fourteen wide column'>Infinitive 1</div>
          <div className='two wide column'>inf2</div>
          <div className='fourteen wide column'>Infinitive 2</div>
          <div className='two wide column'>inst</div>
          <div className='fourteen wide column'>Instrumental clitic</div>
          <div className='two wide column'>ipfv</div>
          <div className='fourteen wide column'>Imperfective</div>
          <div className='two wide column'>iter</div>
          <div className='fourteen wide column'>Iterative/durative aspect</div>
          <div className='two wide column'>juss</div>
          <div className='fourteen wide column'>Jussive</div>
          <div className='two wide column'>loc</div>
          <div className='fourteen wide column'>Locative</div>
          <div className='two wide column'>loc.appl</div>
          <div className='fourteen wide column'>Locative applicative</div>
          <div className='two wide column'>not.aux</div>
          <div className='fourteen wide column'>Negative auxiliary</div>
          <div className='two wide column'>om</div>
          <div className='fourteen wide column'>Object marker (object pronouns)</div>
          <div className='two wide column'>pass</div>
          <div className='fourteen wide column'>Passive</div>
          <div className='two wide column'>past.aux</div>
          <div className='fourteen wide column'>Past tense auxiliary</div>
          <div className='two wide column'>pfv</div>
          <div className='fourteen wide column'>Perfective</div>
          <div className='two wide column'>plz</div>
          <div className='fourteen wide column'>Politeness marker</div>
          <div className='two wide column'>poss</div>
          <div className='fourteen wide column'>Possessive/genitive</div>
          <div className='two wide column'>pro</div>
          <div className='fourteen wide column'>Pronoun</div>
          <div className='two wide column'>prog</div>
          <div className='fourteen wide column'>Progressive</div>
          <div className='two wide column'>prog.aux</div>
          <div className='fourteen wide column'>Progressive auxiliary</div>
          <div className='two wide column'>rtc</div>
          <div className='fourteen wide column'>Finite root clause vowel</div>
          <div className='two wide column'>sclg</div>
          <div className='fourteen wide column'>Strong (definite) noun class concord: class g (sg/pl)</div>
          <div className='two wide column'>scll</div>
          <div className='fourteen wide column'>Strong (definite) noun class concord: class l (sg/pl)</div>
          <div className='two wide column'>scly</div>
          <div className='fourteen wide column'>Strong (definite) noun class concord: class n (pl)</div>
          <div className='two wide column'>sclŋ</div>
          <div className='fourteen wide column'>Strong (definite) noun class concord: class ŋ (sg/pl)</div>
          <div className='two wide column'>sclɲ</div>
          <div className='fourteen wide column'>Strong (definite) noun class concord: class ɲ (pl)</div>
          <div className='two wide column'>sclr</div>
          <div className='fourteen wide column'>Strong (definite) noun class concord: class r (pl)</div>
          <div className='two wide column'>sclð</div>
          <div className='fourteen wide column'>Strong (definite) noun class concord: class ð (sg)</div>
          <div className='two wide column'>scly</div>
          <div className='fourteen wide column'>Strong (definite) noun class concord: class y (sg/pl)</div>
          <div className='two wide column'>way</div>
          <div className='fourteen wide column'>Manner clitic suffix</div>
          <div className='two wide column'>ynq</div>
          <div className='fourteen wide column'>Yes/no question marker</div>
        </div>
    </div>
  }
  }
)

//===========================================Dictionary Code===========================================

//get id of all occurrences of the morpheme and definition pair from the global_id_to_morpheme_definition
function get_occurrence_ids(morpheme_click, definition_click) {
  var results = [];
  for (var i = 0; i < global_id_to_morpheme_definition.length; i++) {

      var morpheme_definition_pair = global_id_to_morpheme_definition[i]["morpheme_definition"];
          
      var match_found = false;
      for (var j = 0; j < morpheme_definition_pair.length; j++) {
          if (morpheme_definition_pair[j]["moroword"] == morpheme_click && morpheme_definition_pair[j]["definition"] == definition_click) {
              match_found = true;
              break;
          }
      }
      if (match_found) {
          results = results.concat (global_id_to_morpheme_definition[i]["id"]);
      //{sentence_id:dirtydata.rows[i].id, utterance_match:sentence.utterance, morphemes_match:sentence.morphemes, gloss_match:sentence.gloss, translation_match:sentence.translation});
      }
      
  }
  //console.log(results);
  return results;
}

function get_rows(list_of_id) {
  var results = [];
  for (var i = 0; i<list_of_id.length; i++) {
    results.push(global_id_to_row[list_of_id[i]])
  }
  return results
}


//Segments a word into morphemes with glosses; morphemes from 'word' argument, glosses from 'glossword' argument
function processword(word, glossword) {
  if (!word || !glossword) {
    return [[], []]
  }
  var results = [];
  var click_database_result = [];
  var morphemes = word.split('-');
  var glosses = glossword.split('-');
  //if there is not the same number of dashes we aren't aligning the correct morphemes and gloss
  if (morphemes.length!=glosses.length) {
    return [[], []];
  }
  var rootindex = -1;
  //identify verb roots so we can distinguish prefixes from suffixes
  for (var i = 0; i < glosses.length; i++) {
    var gloss = glosses[i];
    //all verb root morphemes end with .rt or .aux
    //TODO: does this include be.loc, be.1d, be.2d, etc? @HSande for details
    if (_.startsWith(gloss, 'be.') || _.endsWith(gloss, '.rt') || _.endsWith(gloss, '.aux')) {
      rootindex = i;
    }
  }
  //iterate over morphemes; if there is a verb root, add pre-dashes to suffixes and post-dashes to prefixes: 
  //example: g-a-s-o; clg-rtc-eat.rt-pfv = [g-, a-, s, -o]; [clg-, rtc-, eat.rt, -pfv]
  for (var i = 0; i < glosses.length; i++) {
    var gloss = removePunc(glosses[i].toLowerCase());
    // Remove punctuation, make lower case, and replace all "Latin Letter
    // Small Schwa" characters with "Latin Letter Smal E" characters, so
    // there is just one schwa character in the corpus. 
    var morpheme =
      removePunc(morphemes[i].toLowerCase().replace(/\u0259/g,'\u01DD'))
    
    if (gloss.match(/^[0-9]*$/)){
      continue
    }
    if (rootindex==-1) {
      results.push({moroword:[{word:morpheme, count:1}], definition:gloss});
      click_database_result.push({moroword:morpheme, definition:gloss});
    } else {
      if (i < rootindex) { 
        gloss = gloss+'-';
        morpheme = morpheme+'-';
        results.push({moroword:[{word:morpheme, count:1}], definition:gloss});
        click_database_result.push({moroword:morpheme, definition:gloss});
      } else if (i > rootindex) {
        gloss = '-'+gloss;
        morpheme = '-'+morpheme;
        results.push({moroword:[{word:morpheme, count:1}], definition:gloss});
        click_database_result.push({moroword:morpheme, definition:gloss});
      } else {
        results.push({moroword:[{word:morpheme, count:1}], definition:gloss});
        click_database_result.push({moroword:morpheme, definition:gloss});
      }
    }
  }
  return [results, click_database_result];
}

//merge two arrays and de-duplicate items
function arrayUnique(array) {
  var a = array.concat();
  for(var i=0; i<a.length; ++i) {
      for(var j=i+1; j<a.length; ++j) {
          if(a[i]["word"] === a[j]["word"]) {
              a.splice(j--, 1);
              a[i]["count"] += 1 
          }
      }
  }

  return a;
}

//remove duplicate items for click morpheme_definition_pair_list
function arrayUniqueClick(array) {
  var a = array.concat();
  for(var i=0; i<a.length; ++i) {
      for(var j=i+1; j<a.length; ++j) {
          if(a[i]["moroword"] === a[j]["moroword"] && a[i]["definition"] === a[j]["definition"]) {
              a.splice(j--, 1);
          }
      }
  }

  return a;
}

//Remove punctuation from string excluding dashes and period in word
function removePunc(word) {
  var rtnWord = word.replace(/[,\/#?!\"\“\”$%\^&\*;:{}=_`~()]/g,"");
  rtnWord = rtnWord.replace(/\b[.]+\B|\B[.]+\b/g, "");
  return rtnWord;
}

//Process dict with count to sorted dict without count value
function sortAndRemoveCount(dict) {
  var toRtn = JSON.parse(JSON.stringify(dict));
  for(var i=0; i<toRtn.length; ++i) {
      toRtn[i]["moroword"].sort(function(a, b) {
          return parseFloat(b["count"]) - parseFloat(a["count"]);
      });
      var moroWordsArray = []
      for (var j=0; j<toRtn[i]["moroword"].length; ++j) {
          delete toRtn[i]["moroword"][j]["count"]
          var word = toRtn[i]["moroword"][j]["word"]
          moroWordsArray.push(word)
      }
      toRtn[i]["moroword"] = moroWordsArray
  }
  return toRtn
}

function processdata(dirtydata){
  var results = [];
  for (var i = 0; i < dirtydata.rows.length; i++) {
      // split on spaces and remove punctuation from morphemes line
      var sentence = dirtydata.rows[i].value.sentence; 
      var presplit_morphemes = sentence.morphemes.replace(/[",.?!'()]/g, '');
      var morphemes = presplit_morphemes.split(/[ ][ ]*/);
      var gloss = sentence.gloss.split(/[ ][ ]*/);
      
      var morpheme_definition_pair_list = []; //store morpheme definition pair of a sentence

      if (gloss.length = morphemes.length) {
          //process all morphemes and words
          for (var ii = 0; ii < gloss.length; ii++) {
              var morpheme = morphemes[ii]; 
              var glossword = gloss[ii];
              var temp = processword(morpheme, glossword);
              var wordresults = temp[0];
              var click_database_results = temp[1];
              var startIndex = 0;

              morpheme_definition_pair_list = morpheme_definition_pair_list.concat(click_database_results); //add in the morpheme definition pair

              if (results.length == 0) {
                  results = results.concat(wordresults[startIndex]);
                  startIndex += 1;
              }
              for (var k = startIndex; k < wordresults.length; k++) {
                  var existed = false;
                  for (var j = 0; j < results.length; j++) {
                      if (wordresults[k]["definition"] == results[j]["definition"]) {
                          existed = true;
                          oldMoroword = results[j]["moroword"];
                          newMoroword = arrayUnique(oldMoroword.concat(wordresults[k]["moroword"]));
                          results[j]["moroword"] = newMoroword;
                          break;
                      }       
                  }
                  if (!existed) {
                      results = results.concat(wordresults[k]);
                  }
              }
          }
          //remove duplicate pair 
          morpheme_definition_pair_list = arrayUniqueClick(morpheme_definition_pair_list);
          //add the morpheme definition pair list for each sentence into the global variable
          global_id_to_morpheme_definition.push({id:dirtydata.rows[i].id, morpheme_definition:morpheme_definition_pair_list});
          global_id_to_row[dirtydata.rows[i].id] = dirtydata.rows[i];
      }
  }
//Print out result dict
//console.log(JSON.stringify(results))
//console.log(JSON.stringify(global_id_to_morpheme_definition))
processedDict = sortAndRemoveCount(results)
//console.log("DONE")
//return morphemes/glosses by moro morphemes
return _.sortBy(processedDict, function(j) {
var moroword = _.cloneDeep(j.moroword);
return _.map(moroword, function(x) {
  if (x[0] == '-') {
    return x.slice(1);
  }
  return x;
});
})
}

// This is a test for processing code
function assert(expected_value, actual) {
  if (!_.isEqual(expected_value, actual)){
    console.error('assertion failed');
    console.error(expected_value);
    console.error(JSON.stringify(expected_value));
    console.error(actual);
    console.error(JSON.stringify(actual));

  }
}

function test_processdata() {
  var testcase1 = {rows:[{value:{sentence:{morphemes:'a', gloss:'A'}}}]};
  assert([{moroword:['a'], definition:'a'}], processdata(testcase1));
  var testcase2 = {rows:[{value:{sentence: {morphemes:'a-b d', gloss:'A-B A'}}}]};
  assert([{moroword:['a','d'], definition:'a'}, {moroword:['b'], definition:'b'}], processdata(testcase2));
  var testcase3 = {rows:[{value:{sentence:{morphemes:'"loman-nǝŋ maj-anda l-a-fo,', gloss:'day-indef man-assoc.pl cll-rtc-past.aux'}}}]};
  assert([{moroword:['a-'], definition:'rtc-'},
          {moroword:['anda'], definition:'assoc.pl'},
          {moroword:['fo'], definition:'past.aux'},
          {moroword:['l-'], definition:'cll-'},
          {moroword:['loman'], definition:'day'}, 
          {moroword:['maj'], definition:'man'},
          {moroword:['nǝŋ'], definition:'indef'},
            ], processdata(testcase3));
  var testcase4 = {rows:[{value:{sentence:{morphemes:'"a,!?..', gloss:'A'}}}]};
  assert([{moroword:['a'], definition:'a'}], processdata(testcase4));
  var testcase5 = {rows:[{value:{sentence:{morphemes:'b-a c', gloss:'B-A C'}}}]};
  assert([{moroword:['a'], definition:'a'}, {moroword:['b'], definition:'b'}, {moroword:['c'], definition:'c'}], processdata(testcase5));
  } 
//test_processdata();

// promise that resolves when sentence data is loaded and processed into morpheme dictionary
var dictionary_data_promise = sentence_data_promise.then(function(data) {
  return processdata({rows: data}); 
});

//Dictionary viewing code
//ReactClass for rendering a definition
var Definition = React.createClass({
  render: function() {
    var morph_def_pairs = _.map(this.props.moroword, function(morpheme) {
      return {
        morpheme: morpheme,
        definition: this.props.definition
      }
    }.bind(this));

    var rendered_morphemes = _.map(morph_def_pairs, function(pair, i) {
      var comma = ', ';
      if (i == 0) {
        comma = '';
      }
      var url = ('#/dict/concordance/' + pair.morpheme + '/' +
                  pair.definition + '?' + CurrentMetaURI().query());
      return <span key={pair.morpheme}>
        {comma}
        <a href={url}>
          {pair.morpheme}
        </a>
      </span>;
    })

    return (
      <div className="ui vertical segment">
        <h2>
          {rendered_morphemes}
        </h2>
        {this.props.definition}
      </div>
    );
  }
});
// ReactClass for rendering many definitions
var DictList = React.createClass({
  render: function() {
    var definitions=this.props.data.map(function(def) {
      return ( <Definition key={def['moroword'] + ':' + def.definition}
                            moroword={def['moroword']}
                            definition={def['definition']}/> )
    });

    return (
      <div>
        {definitions}
      </div>
    );
  }
});


//SEARCH CODE

//matchSearchFunc for definition to searchTerm (EngPlain)
function matchSearchFuncEngPlain (searchTerm) {
  return function(element) {
    if (element.definition == searchTerm) {
      return true;
    } else {
      return false;
    }
  }
}

//matchSearchFunc for definition to searchTerm (EngRegex)
function matchSearchFuncEngRegex (searchTerm) {
  return function(element) {
    var re = ".*" + searchTerm + ".*";
    if (element.definition.match(re)) {
      return true;
    } else {
      return false;
    }
  }
}

//matchSearchFunc for moroword to searchTerm (MoroPlain)
function matchSearchFuncMoroPlain (searchTerm) {
  return function(element) {
    return findMoroWordInArrayMoroPlain(element.moroword, searchTerm)
  }
}

//matchSearchFunc healper for moroword to searchTerm (without regrex)
function findMoroWordInArrayMoroPlain (categories, moroword) {
  var found = false;
  for (i = 0; i < categories.length && !found; i++) {
    if (categories[i] === moroword) {
      found = true;
    }
  }
  return found
}

//matchSearchFunc for moroword to searchTerm (MoroRegex)
function matchSearchFuncMoroRegex (searchTerm) {
  return function(element) {
    return findMoroWordInArrayMoroRegex(element.moroword, searchTerm)
  }
}

//matchSearchFunc healper for moroword to searchTerm (with regrex)
function findMoroWordInArrayMoroRegex (categories, moroword) {
  var found = false;
  for (i = 0; i < categories.length && !found; i++) {
    // if (categories[i] === moroword) {
    var re = ".*" + moroword + ".*";
    if (categories[i].match(re)) {
      found = true;
    }
  }
  return found
}


// React container for rendering 1 page of dictionary entries, with a
// header and footer for page navigation.
var DictPage = React.createClass({
  render: function() {

    if (firstLoad == true) {
      global_whole_data = this.props.data;
      firstLoad = false;
    }

    var data = this.props.data;
    var search = this.props.search;
    if (search == "") {
      data = global_whole_data;
    } else {
      var filter;

      if (this.props.search_language == 'eng') {
        if(this.props.regex) {
          filter = matchSearchFuncEngRegex;
        } else {
          filter = matchSearchFuncEngPlain;
        }
      } else {
        if(this.props.regex) {
          filter = matchSearchFuncMoroRegex;
        } else {
          filter = matchSearchFuncMoroPlain;
        }
      }

      data = data.filter(filter(search));
    }


    // TODO: We might have to compute the alphabet on-demand here, since
    // our skips are going to be wrong.

    var skip = this.props.skip;
    var pagesize = this.props.limit;
    var length = data.length;

    if (length == 0) {
      return <div> No Results Found </div>
    } else {

      pc = GetPaginationControls(skip, length, pagesize);
      return <div>
        {pc.page_controls}
        <DictList data={_(data).drop(pc.skip).take(pagesize).value()} />
        {pc.page_controls}
      </div>
    }
  }
});

// React container that will show a loading dimmer until the dictionary data is available; then renders definitions
var DictBox = React.createClass({
  getInitialState: function() {
    return {
      data: [],
      loaded: false,
    };
  },
  clearSkip : function() {
    UpdateQuery({'skip': 0});
  },
  componentDidMount: function() {
    dictionary_data_promise.then(function(dictdata) {

      // Find the first index of each letter, grouping numbers.
      var alphabet = {}
      _.forEach(dictdata, function consider_word(word, index) {
        var c = _.get(word, ["moroword", 0, 0], "");
        if (c == "-") {
          c = _.get(word, ["moroword", 0, 1], "");
        }
        c = "" + c;
        if (c.match(/[0-9]/)) {
          c = '0-9';
        }
        if (c) {
          if (alphabet[c] == undefined) {
            alphabet[c] = index;
          }
        }
      });

      this.setState(
      {
        data: dictdata,
        alphabet: alphabet,
        loaded: true
      },
      function() {
        $(this.refs.right_half.getDOMNode()).sticky({});
      }.bind(this));
    }.bind(this));
  },
  render: function() {
    if (this.state.loaded) {
      var alphabet = this.state.alphabet;
      var alphabet_buttons = _.map(_.toPairs(alphabet), function(pair) {
        var letter = pair[0];
        var skip = pair[1];
        return <UrlParameterButton key={letter}
                  update={{
                    search: '',
                    skip: skip
                  }}
                  custom_style={{
                    paddingLeft: "8px",
                    paddingRight: "8px",
                  }}>
            {letter}
          </UrlParameterButton>;
      });

      var data = this.state.data;
      return (
        <div className='ui text container'>
          <div className="ui grid">
            <div className="sixteen wide column">
              <h1>
              Concordance:
              </h1>

              <div className="ui grid">
                <div className="sixteen wide column">
                    <SearchBox renderParameters={true}
                                onGo={this.clearSkip}/>
                </div>
                <div className="sixteen wide column">
                    <div className="ui buttons" style={{marginBottom: "5px"}}>
                    {alphabet_buttons}
                    </div>
                </div>
              </div>

            </div>
            <div className="eight wide column">
              <UrlParameterExtractor defaults={{skip: 0,
                                                limit: 50,
                                                search: '',
                                                regex: false,
                                                search_language: 'moro'}}>
                <DictPage data={data} />
              </UrlParameterExtractor>
            </div>
            <div className="eight wide column">
              <div ref='right_half' className="ui sticky">
                <RouteHandler data={data}/>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return <div className="ui active dimmer">
          <div className="ui text loader">Loading</div>
      </div>
  }
});

// Dictionary view with concordance.
var ConcordanceView = React.createClass({
  render: function() {
    var morpheme = this.props.params.morpheme 
    var definition = this.props.params.definition
    var list_of_occurrence = get_occurrence_ids(morpheme, definition);
    var list_of_four_sentences = get_rows(list_of_occurrence)
    var sentences = _.map(list_of_four_sentences, function(x) {
      return <Sentence key={x.key} sentence={x.value.sentence} show_gloss={true} />
    });
    return <div className="ui segment">
      Definition for: {this.props.params.morpheme} is {this.props.params.definition}
      <br/>
      Occurred at:<br/>
      {sentences}
    </div>
  }
});

var DictView = React.createClass({
  render: function() {
    return <div> </div>
  }
});

//===================================================Text Page==================================
// React Class that renders list of stories with links to story content pages (w/loading dimmer)
var TextBox = React.createClass({
  getInitialState: function() {
    return {data: [],
      <div className='ui text container'>
        <h1 className='ui dividing header'>Texts</h1>
        <div className="ui segment">
          <img className="ui medium spaced rounded image" src="./images/Fufu Cooking5.8.png" alt="Image of children cooking" />
        </div>loaded: false};
  },
  componentDidMount: function() {
    story_data_promise.then(function(rawdata){
      this.setState({data: rawdata, loaded: true});
    }.bind(this))
  },
  render: function() {
    if (this.state.loaded){
      var results = this.state.data.rows.map(function (x) {
        return <li key={x.key}><Link to='Story' params={{key: x.key}}>{x.value.name}</Link> by {x.value.author}</li>

      });
      return <div><ul>{results}</ul></div>;
    }
    else {
      return <div className="ui active dimmer">
            <div className="ui text loader">Loading</div>
            </div>
    }
  }
});

// TODO: could potentially be the same class as textbox above with variables based on global_show_french
var TextBoxFR = React.createClass({
  getInitialState: function() {
    return {data: [], loaded: false};
  },
  componentDidMount: function() {
    story_data_promise.then(function(rawdata){
      this.setState({data: rawdata, loaded: true});
    }.bind(this))
  },
  render: function() {
    if (this.state.loaded){
      var results = this.state.data.rows.map(function (x) {
        return <li key={x.key}><Link to='StoryFR' params={{key: x.key}}>{x.value.name_fr}</Link> de {x.value.author}</li>

      });
      return <div><ul>{results}</ul></div>;
    }
    else {
      return <div className="ui active dimmer">
            <div className="ui text loader">Loading</div>
            </div>
    }
  }
});

// A component to render a single sentence.
var Sentence = React.createClass({
  render: function() {
    var gloss = '';
    var sentence = this.props.sentence;

    if (this.props.only_utterance) {
      return <div style={{marginBottom: "10px"}}>
        {sentence.utterance}
      </div>;
    }

    if (this.props.only_translation) {
      return <div style={{marginBottom: "10px"}}>
        {sentence.translation}
      </div>;
    }

    if (this.props.only_french) {
      return <div style={{marginBottom: "10px"}}>
        {sentence.french}
      </div>;
    }
    
    // interlinear gloss alignment
    if (this.props.show_gloss) {
      var morphemes = sentence.morphemes.split(' ');
      var glosses = sentence.gloss.split(' ');
      var pairs = _.zip(morphemes, glosses);
      // render one inline block div containing morpheme and gloss per word
      var glosses = _(pairs).map(function(x, i){
        var morpheme = x[0];
        var gloss = x[1];
        return <div style={{display: "inline-block", marginRight: "5px"}} key={i}>{morpheme}<br/>{gloss}</div>
      }.bind(this)).value();
      gloss = <span>{glosses}<br/></span>;
    }

    // render utterance and translation
    return <div style={{marginBottom: "10px"}}>
      <b>{sentence.utterance}</b><br/>
      {gloss}
      {<span>{sentence.translation}<br/></span>}
      {sentence.french}
    </div>
  } // EDIT: sentence.translation to <span>{sentence.translation}<br/></span> to add french
});



//=========================Search Page===============================
var SearchPane = React.createClass({
  getInitialState: function() {
    return {
      sentence: {data: [], loaded: false},
      story: {data: [], loaded: false}
    };
  },

  //queue uploading of story and sentence data when this component is mounted
  componentDidMount: function() {
    story_data_promise.then(function(rawdata){
      this.setState({story:{data: rawdata.rows, loaded: true}});
    }.bind(this));

    sentence_data_promise.then(function(sentences){
      this.setState({sentence:{data: sentences, loaded: true}});
    }.bind(this));
  },

  //only ready to display story when story and sentence data have loaded
  loaded: function() {
    return this.state.story.loaded && this.state.sentence.loaded;
  },

  render_results: function(stories, results) {
    var results_per_story = _.reduce(results, function(acc, x) {
      var new_list = _.get(acc, x.key[0], []);
      new_list.push(x);
      acc[x.key[0]] = new_list;
      return acc;
    }, {})
    var rendered_results = _(_.toPairs(results_per_story)).map(
      function(x) {
        var story = x[0];
        var sentences = x[1];
        var rendered_sentences = _.map(sentences, function(x) {
          return <Sentence key={x.key}
                            sentence={x.value.sentence}
                            show_gloss={true} />
        });

        var storyname = _.get(_.filter(stories, function(x) {
          return x.key == story;
        }), '[0].value.name', 'UNKNOWN STORY');

        return <div key={story}>
          <b>Results from <Link to='Story' params={{key: story}}>{storyname}</Link> :</b>
          {rendered_sentences}
        </div>;
      }
    ).value();
    return rendered_results;
  },

  clearSkip : function() {
    UpdateQuery({'skip': 0});
  },

  render: function() {
    function matchesAnySentence(x) {
      return (
        x.value.sentence.translation.search(search_regex) != -1 ||
        x.value.sentence.gloss.search(search_regex) != -1 ||
        x.value.sentence.utterance.search(search_regex) != -1 ||
        x.value.sentence.morphemes.search(search_regex) != -1
      )
    }

    if (!this.loaded()) {
      return <div className="ui active dimmer">
        <div className="ui text loader">Loading</div>
      </div>;
    }
    var search_regex = new RegExp(this.props.search);
    var results = _.filter(this.state.sentence.data, matchesAnySentence);

    var skip = this.props.skip;
    var pagesize = this.props.limit;
    var length = results.length;

    pc = GetPaginationControls(skip, length, pagesize);

    results = _.take(_.drop(results, pc.skip), pagesize);

    var rendered_results;
    if (results.length > 0) {
        var rr = this.render_results(this.state.story.data,
                                                    results);
        rendered_results = <div>
          {pc.page_controls}
          {rr}
          {pc.page_controls}
        </div>
    } else {
        rendered_results = <div>
          No Matches Found.
        </div>
    }

    return (
      <div>
        <h1> </h1>
        <center>
          <SearchBox onGo={this.clearSkip}/>
        </center>
        {rendered_results}
      </div>
    );
  }
});

var SearchPage = React.createClass({
  render: function() {
    return (
      <UrlParameterExtractor defaults={{
        skip: 0,
        limit: 100,
        search: ''
      }}>
        <SearchPane />
      </UrlParameterExtractor>
    );
  }
});

//render page template using ReactRouter: https://github.com/rackt/react-router/blob/0.13.x/docs/guides/overview.md
var App = React.createClass({
  mixins: [Navigation, State],

  toggleLang: function() {
    global_show_french = !global_show_french;
    this.render();
  },
  displayLang: function() {
    curr = this.getPath();
    if (global_show_french) {
      if (curr == '/') {this.transitionTo('/FR');}  // switch on setup which defaults to EN
      else if (curr.slice(-3) != '/FR') {
        this.transitionTo(curr + '/FR');
      }
    }
    else {
      if (curr == '/FR') {this.transitionTo('/');}
      else if (curr.slice(-3) == '/FR') {
        this.transitionTo(curr.slice(0, -3));
      }
    }
  },
  componentDidMount: function() {
    $(React.findDOMNode(this.refs.glossingPopupActivator)).popup({
      hoverable: true,
      inline: true,
      position: 'bottom right',
    });
  },
  render: function() {
    // console.log('rendering')
    if (global_show_french) {
      homepage = 'HomepageFR'
      about = 'Page d’accueil'
      texts = 'TextsFR'
      texts_label = 'Textes'
      orthography = 'OrthographyFR'
      ortho_label = 'Orthographe'
      dictionary = 'DictFR'
      search = 'SearchFR'
      concordance = 'Concordance'
      gloss = 'GlossesFR'
      gloss_label = 'GlossingFR'
    }
    else {
      homepage = 'Homepage'
      about = 'About'
      texts = 'Texts'
      texts_label = 'Texts'
      orthography = 'Orthography'
      ortho_label = 'Orthography'
      dictionary = 'Dictionary'
      search = 'Search'
      concordance = 'Concordance'
      gloss = 'Glosses'
      gloss_label = 'Glossing'
    }

    return <div className='ui main text container'> 
    <div className='ui borderless main menu fixed' styleName='position: fixed; top: 0px; left: auto; z-index: 1;'>
        <div className='ui text container'>
          {/* {console.log('making links')} */}
          <Link className='item' to={homepage} >{about}</Link> 
          <Link className='item' to={orthography} >{ortho_label}</Link>
          <Link className='item' to={texts} >{texts_label}</Link>
          {/*<Link className='item' to='Dictionary' >Concordance</Link>*/}
          <Link className='item' to={dictionary}>Concordance</Link>
          {/* line below is for link checking, can remove */}
          {/* <Link className='item' to='Dictionary' >{this.getPath()}</Link> */} 
          <Link className='item' to={dictionary}>Search</Link>
          {/* added french toggle */}
          <div className='item'>
            <div className="ui slider checkbox">
            <input type="radio" name="toggle_lang" checked={global_show_french} onChange={this.toggleLang}> </input>
            
            <label>French 🇫🇷</label>
            </div>
          </div>
      {/* <Link to={gloss} className='right item' ref='glossingPopupActivator'>{gloss_label}
          <i className="dropdown icon"></i>
      </Link> */}
          <Link className='item' to={gloss} >{gloss_label}</Link>
      {/* <div ref='glossingPopup' className='ui small popup bottom left transition hidden'>
          <div className='ui two column center aligned grid'>
            <div className='row'>
              <Link to={gloss}><div className='ui top attached button'>click for complete list</div></Link>
              </div>
            <div className='three wide column'>appl</div>
            <div className='thirteen wide column'>Applicative</div>
            <div className='three wide column'>clX</div>
            <div className='thirteen wide column'>Noun class X agreement</div>
            <div className='three wide column'>d</div>
            <div className='thirteen wide column'>Distal</div>
            <div className='three wide column'>comp</div>
            <div className='thirteen wide column'>Complementizer</div>
            <div className='three wide column'>cons</div>
            <div className='thirteen wide column'>Consecutive</div>
            <div className='three wide column'>dpc</div>
            <div className='thirteen wide column'>Dependent clause vowel</div>
            <div className='three wide column'>ipfv</div>
            <div className='thirteen wide column'>Imperfective</div>
            <div className='three wide column'>inf</div>
            <div className='thirteen wide column'>Infinitive</div>
            <div className='three wide column'>pass</div>
            <div className='thirteen wide column'>Passive</div>
            <div className='three wide column'>pfv</div>
            <div className='thirteen wide column'>Perfective</div>
            <div className='three wide column'>rtc</div>
            <div className='thirteen wide column'>Finite root clause vowel</div>
          </div>
        </div> */}
      </div>
    </div>
    <div className='ui borderless secondary menu' styleName='position: fixed; top: 0px; left: auto; z-index: 1;'>
      <div className='ui text container'>
        {/* <Link className='item' to='Homepage' >About</Link> 
        <Link className='item' to='Texts' >Texts</Link>
        <Link className='item' to='Dictionary' >Concordance</Link> */}
      </div>
    </div>
    <RouteHandler/>
    {/* {print('switching lang')} */}
    {this.displayLang()}
    </div>}
});


// set up routes for ReactRouter: https://github.com/rackt/react-router/blob/0.13.x/docs/guides/overview.md
// enables the single-page web app design
var routes = <Route handler={App}>
  <Route path = '/' handler={Homepage} name='Homepage'/>
  <Route path = '/FR' handler={HomepageFR} name='HomepageFR' />

  <Route path = '/orthography' handler={Orthography} name='Orthography' />
  <Route path = '/orthography/FR' handler={OrthographyFR} name='OrthographyFR' />

  <Route path = '/text' handler={TextBox} name='Texts' />
  <Route path = '/text/FR' handler={TextBoxFR} name='TextsFR' />
  <Route path = '/text/story/:key' handler={StoryView} name='Story' />
  <Route path = '/text/story/:key/FR' handler={StoryViewFR} name='StoryFR' />

  <Route path = '/dict' handler={DictBox} name='Dictionary'>
    <Route path = '/dict'
            handler={DictView} name='Dict' />
    <Route path = '/dict/FR' 
            handler={DictView} name='DictFR'/>
    <Route path = '/dict/concordance/:morpheme/:definition'
            handler={ConcordanceView} name='Concordance'/>

  <Route path = '/search' handler={SearchPage} name='Search' />
  <Route path = '/search/FR' handler={SearchPage} name='SearchFR' />
  <Route path = '/glosses' handler={Glosspage} name='Glosses' />
  <Route path = '/glosses/FR' handler={GlosspageFR} name='GlossesFR' />

  </Route>

  

  {/*
  <Route path = '/dict/FR' handler={DictBox} name='DictionaryFR'>
    <Route path = '/dict/FR'
            handler={DictView} name='DictFR'/>
    <Route path = '/dict/concordance/:morpheme/:definition/FR'
            handler={ConcordanceView} name='ConcordanceFR'/>

  <Route path = '/search' handler={SearchPage} name='Search' />
  <Route path = '/glosses' handler={Glosspage} name='Glosses' />
  <Route path = '/glosses/FR' handler={GlosspageFR} name='GlossesFR' />
  </Route> */}

</Route>
ReactRouter.run(
  routes, function(Handler) {
    React.render(<Handler/>, document.getElementById('content'))

  }
  );
