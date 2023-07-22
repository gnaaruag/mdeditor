const textinput = document.querySelector('#textinput');
const markdown_preview = document.querySelector('article');

const h1 = /^#[^#].*$/gm;
const h2 = /^##[^#].*$/gm;
const h3 = /^###[^#].*$/gm;
const bold = /\*\*[^\*\n]+\*\*/gm;
const highlight = /==[^==\n]+==/gm;
const italics = /[^\*]\*[^\*\n]+\*/gm;
const link = /\[[\w|\(|\)|\s|\*|\?|\-|\.|\,]*(\]\(){1}[^\)]*\)/gm;
const lists = /^(\s*(\-|\d\.) [^\n]+)+$/gm;
const unorderedList = /^\-\s.*$/;
const orderedList = /^\d\.\s.*$/;

const themeBtn = document.querySelector('.theme');

themeBtn.addEventListener('click', () => 
{
    document.body.classList.toggle('dark');
    themeBtn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙'
    themeBtn.classList.toggle('dark');
});


textinput.addEventListener('input', (e) => 
{
    let content = e.target.value;

    if (h1.test(content)) {
        const matches = content.match(h1);
        
        matches.forEach((element) => {
            const extractedText = element.slice(1);

            content = content.replace(element, `<h1>${extractedText}</h1>`)
        })

    }

    if (h2.test(content)) {
        const matches = content.match(h2);

        matches.forEach((element) => {
            const extractedText = element.slice(2);

            content = content.replace(element, `<h2>${extractedText}</h2>`)
        })
    }

    if (h3.test(content)) {
        const matches = content.match(h3);

        matches.forEach((element) => {
            const extractedText = element.slice(3);

            content = content.replace(element, `<h3>${extractedText}</h3>`)
        })
    }

    if (bold.test(content)) {
        const matches = content.match(bold);

       matches.forEach((element) => {
        const extractedText = element.slice(2, -2);

        content = content.replace(element, `<strong>${extractedText}</strong>`)
       })
    }

    if (highlight.test(content)) {
        const matches = content.match(highlight);

        matches.forEach((element) => {
            const extractedText = element.slice(2, -2);

            content = content.replace(element, `<span class="highlight">${extractedText}</span>`)
        })
    }

    if (italics.test(content)) {
        const matches = content.match(italics);
        matches.forEach((element) => {
            const extractedText = element.slice(2, -1);
            content = content.replace(element, `<em>${extractedText}</em>`);
        })
    } 


    if (link.test(content)) {
        const links = content.match(link);

        links.forEach((element) => {
            const text = element.match(/^\[.*\]/)[0].slice(1, -1);
            const url = element.match(/\]\(.*\)/)[0].slice(2, -1);
            content = content.replace(element, `<a href=${url}>${text}</a>`);
        })
    }

  if (lists.test(content)) {
  const matches = content.match(lists)

  matches.forEach((list) => {
    const listArray = list.split('\n')
    const formattedList = listArray
      .map((currentValue, index, array) => {
        if (unorderedList.test(currentValue)) {
          currentValue = `<li>${currentValue.slice(2)}</li>`;
          if (!unorderedList.test(array[index - 1])) {
            currentValue = '<ul>' + currentValue
          }
          if (!unorderedList.test(array[index + 1])) {
            currentValue = currentValue + '</ul>'
          }
        }
        if (orderedList.test(currentValue)) {
          currentValue = `<li>${currentValue.slice(2)}</li>`;

          if (!orderedList.test(array[index - 1])) {
            currentValue = '<ol>' + currentValue;
          }

          if (!orderedList.test(array[index + 1])) {
            currentValue = currentValue + '</ol>';
          }
        }

        return currentValue
      })
      .join('');

      content = content.replace(list, formattedList);
    })
  }

  content = content
  .split('\n')
  .map((line) => 
  {
      if (!line.startsWith('<') && line !== '') {
        return line.replace(line, `<p>${line}</p>`)
      } 
      else {
        return line
      }
  })
  .join('\n');
    
  console.log(content);
  markdown_preview.innerHTML = content;
});

