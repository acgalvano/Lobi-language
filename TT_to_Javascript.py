import re
from deep_translator import GoogleTranslator

filename = input("Enter your file name (without) .txt): ")
filename += ".txt"
entry_num = input("Enter the id number for this to begin on: ")
id_num = int(entry_num)
story_input = input("Enter the story number: ")
story_num = int(story_input)
with open(filename, "r") as file:
    text = file.read()

def tabs_to_spaces(text):
    """Replaces tabs with spaces in a given text."""
    new_text = text.replace('\t', ' ')
    return new_text


    
text_w_space = tabs_to_spaces(text)
translator = GoogleTranslator(source='en', target='fr')

# Split by two or more newline characters to get blocks
passages = re.split(r'\n{2,}', text_w_space.strip())
# Now within each block, split by single newline, creating a list of lists
list_of_passages = [passage.split('\n') for passage in passages]

def create_javascript(passages, start_entry_num, story_num):
    return_string = ""
    for passage in passages:
        if len(passage) < 3:
            continue

        for i in range(len(passage)):
            passage[i] = passage[i].replace("\"", "\\\"")

        translated = translator.translate(passage[2])
        return_string += f'''
        ,
        {{
            "id": "{start_entry_num}",
            "key": [
                "1",
                {start_entry_num},
                "{start_entry_num}"
            ],
            "value": {{
                "story": "{story_num}",
                "sentence": {{
                    "judgement": "",
                    "utterance": "{passage[0]}",
                    "morphemes": "{passage[0]}",
                    "gloss": "{passage[1]}",
                    "translation": "{passage[2]}",
                    "french": "{translated}",
                    "tags": "",
                    "syntacticCategory": "n n n Conj Adj.fr",
                    "syntacticTreeLatex": "",
                    "validationStatus": "",
                    "enteredByUser": "",
                    "modifiedByUser": ""
                }}
            }}
        }}'''
        start_entry_num += 1
            
    return return_string


result = create_javascript(list_of_passages, id_num, story_num=0)
#need parameter of number we start counting from

        

with open("New" + filename, 'w') as file:
    # Write text to the file
    file.write(result)