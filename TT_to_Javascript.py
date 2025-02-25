import re
from deep_translator import GoogleTranslator

filename = input("Enter your file name (without .txt): ")
filename += ".txt"
phonfile = input("Enter your phonetic file name (without .txt): ")
phonfile += ".txt"
entry_num = input("Enter the id number for this to begin on: ")
id_num = int(entry_num)
story_input = input("Enter the story number: ")
story_num = int(story_input)



with open(filename, "r") as file:
    text = file.read()

with open(phonfile, "r") as file2:
    text2 = file2.read()

def tabs_to_spaces(text):
    """Replaces tabs with spaces in a given text."""
    new_text = text.replace('\t', ' ')
    return new_text


text_w_space = tabs_to_spaces(text)
translator = GoogleTranslator(source='en', target='fr')

# Split by two or more newline characters to get blocks
passages = re.split(r'\n{2,}', text_w_space.strip())
phonpassages = re.split(r'\n{2,}', text2.strip())
# Now within each block, split by single newline, creating a list of lists
list_of_passages = [passage.split('\n') for passage in passages]
phon_list = [phonpassage.split('\n') for phonpassage in phonpassages]

def create_javascript(passages, phon_passages, start_entry_num, story_num=0):
    return_string = ""
    for passage, phon_passage in zip(passages, phon_passages):
        if len(passage) < 3:
            continue

        for i in range(len(passage)):
            passage[i] = passage[i].replace("\"", "\\\"")
            passage[i] = passage[i].replace("/", "\\/")
            passage[i] = passage[i].replace("(", "\(")
            passage[i] = passage[i].replace(")", "\)")

        for i in range(len(phon_passage)):
            phon_passage[i] = phon_passage[i].replace("\"", "\\\"")
            phon_passage[i] = phon_passage[i].replace("/", "\\/")
            phon_passage[i] = phon_passage[i].replace("(", "\(")
            phon_passage[i] = phon_passage[i].replace(")", "\)")
    

        translated = translator.translate(passage[2])
        return_string += f'''
        ,
        {{
            "id": "{start_entry_num}",
            "key": [
                "{story_num}",
                {start_entry_num},
                "{start_entry_num}"
            ],
            "value": {{
                "story": "{story_num}",
                "sentence": {{
                    "judgement": "",
                    "utterance": "{phon_passage[0]}",
                    "morphemes": "{phon_passage[1]}",
                    "gloss": "{passage[1]}",
                    "translation": "{passage[2]}",
                    "french": "{translated}",
                    "tags": "",
                    "syntacticCategory": "",
                    "syntacticTreeLatex": "",
                    "validationStatus": "",
                    "enteredByUser": "",
                    "modifiedByUser": ""
                }}
            }}
        }}'''
        start_entry_num += 1
            
    return return_string


result = create_javascript(list_of_passages, phon_list, id_num, story_num)
#need parameter of number we start counting from

        

with open("New" + filename, 'w') as file:
    # Write text to the file
    file.write(result)
