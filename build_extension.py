def replace_index():
    with open('build/index.html', 'r') as index_file:
        content = index_file.read().replace('/snake/', '')
    with open('build/index.html', 'w') as index_file:
        index_file.write(content)
    with open('./manifest.json', 'r') as manifest:
        manifest_content = manifest.read()
    with open('build/manifest.json', 'w') as manifest:
        manifest.write(manifest_content)


def main():
    replace_index()

if __name__ == '__main__':
    main()