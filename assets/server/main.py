import os

from argostranslate import translate, package
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

language_dir = './languages'

for language_file in os.listdir(language_dir):
    package.install_from_path(os.path.join(language_dir, language_file))


@app.route('/translate', methods=['POST'])
def translate_text():
    data = request.get_json()

    source = data.get('source')
    target = data.get('target')
    text = data.get('text')

    languages = translate.load_installed_languages()

    source_lang = next((lang for lang in languages if lang.code == source), None)
    target_lang = next((lang for lang in languages if lang.code == target), None)

    translation = source_lang.get_translation(target_lang)
    translated_text = translation.translate(text)

    print(f"Translated text: {translated_text}")

    return jsonify({'translated': translated_text})


if __name__ == '__main__':
    app.run(port=5000)
