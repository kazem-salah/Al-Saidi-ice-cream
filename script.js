const menuData = [
  {
    id:'ice', title:'آيس كريم', subtitle:'اختيارات الآيس كريم', image:'assets/ice-cream.jpg',
    items:[
      ['بسكوتة كونو وسط',40],
      ['بسكوتة كونو الصعيدي',55],
      ['بسكوتة اسكندراني',40],
      ['كوب ايس كريم وسط',40],
      ['كوب ايس كريم الصعيدي',55],
      ['كاس ايس كريم',60],
      ['كاس ايس كريم ميكس ايت',90]
    ]
  },
  {
    id:'family', title:'الحجم العائلي', subtitle:'عبوات وأحجام عائلية', image:'assets/ice-cream.jpg',
    items:[
      ['علبة عائلي صغير',150],
      ['علبة عائلي وسط',180],
      ['علبة عائلي كبير',210],
      ['نصف جالون ايس كريم',310],
      ['جالون ايس كريم',460]
    ]
  },
  {
    id:'rice', title:'ارز باللبن', subtitle:'اختيارات أرز باللبن', image:'assets/rice-honey.jpg',
    items:[
      ['ارز سادة',30],
      ['ارز ايس',50],
      ['ارز ايس مكسرات',80],
      ['ارز مكسرات',60],
      ['ارز عسل',40],
      ['ارز عسل مكسرات',70],
      ['ارز قشطة',50],
      ['ارز قشطة ايس',70],
      ['ارز قشطة مكسرات',80],
      ['ارز لوتس',65],
      ['ارز اوريو',65],
      ['ارز بستيليو',65],
      ['ارز الصعيدي',105,'ايس مكسرات + قشطة + عسل + نوتيلا او صوص شيكولاته']
    ]
  },
  {
    id:'fruit', title:'ارز فواكه', subtitle:'كل الاختيارات بسعر موحد', image:'assets/rice-variety.jpg',
    items:[
      ['ارز موز',65],
      ['ارز مانجو',65],
      ['ارز فراولة',65],
      ['ارز جوافة',65]
    ], note:'سعر موحد 65'
  },
  {
    id:'extras', title:'الاضافات', subtitle:'إضافات حسب الطلب', image:null,
    items:[
      ['اضافة ايس',20],
      ['اضافة مكسرات',30],
      ['اضافة عسل',10],
      ['اضافة قشطة',20],
      ['اضافة صوص',20],
      ['اضافة بسكوت لوتس او اوريو',15],
      ['بسكوتة كونو فارغ',5],
      ['زجاجة مياه معدنية',10]
    ]
  }
];

const grid = document.getElementById('menuGrid');
const searchInput = document.getElementById('searchInput');
const clearSearch = document.getElementById('clearSearch');
const empty = document.getElementById('searchEmpty');
const count = document.getElementById('itemCount');
const tabs = [...document.querySelectorAll('.category-tab')];
let activeCategory = 'all';

function money(value){ return `<span class="currency">جنيه</span> ${value}`; }

function render(){
  const q = searchInput.value.trim().toLowerCase();
  grid.innerHTML = '';
  let visible = 0;

  menuData.forEach(group => {
    if(activeCategory !== 'all' && activeCategory !== group.id) return;
    const matched = group.items.filter(item => `${item[0]} ${item[2] || ''}`.toLowerCase().includes(q));
    if(!matched.length) return;
    visible += matched.length;

    const groupEl = document.createElement('section');
    groupEl.className = 'menu-group';
    groupEl.id = `section-${group.id}`;
    groupEl.dataset.category = group.id;
    groupEl.innerHTML = `
      <div class="menu-group-head">
        ${group.image ? `<img class="group-image" src="${group.image}" alt="">` : '<div class="group-image" style="background:linear-gradient(135deg,#171717,#3b3b3b)"></div>'}
        <div><h3>${group.title}</h3><p>${group.subtitle}${group.note ? ` • ${group.note}` : ''}</p></div>
      </div>
      <div class="menu-grid group-extra" style="margin-top:0"></div>
    `;
    const cards = groupEl.querySelector('.menu-grid');
    matched.forEach(item => {
      const card = document.createElement('article');
      card.className = 'menu-card';
      const photo = group.image ? `<img class="item-photo" src="${group.image}" alt="${item[0]}" loading="lazy">` : '';
      card.innerHTML = `${photo}<div class="item-main"><div class="item-name">${item[0]}</div>${item[2] ? `<div class="item-desc">${item[2]}</div>` : ''}</div><div class="item-price">${money(item[1])}</div>`;
      cards.appendChild(card);
    });
    grid.appendChild(groupEl);
  });

  count.textContent = `${visible} صنف`;
  empty.hidden = visible !== 0;
  clearSearch.classList.toggle('visible', !!searchInput.value);
}

tabs.forEach(tab => tab.addEventListener('click', () => {
  tabs.forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
  activeCategory = tab.dataset.category;
  render();
  if(activeCategory !== 'all'){
    const target = document.getElementById(`section-${activeCategory}`);
    if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
  }
}));

searchInput.addEventListener('input', render);
clearSearch.addEventListener('click', () => { searchInput.value=''; render(); searchInput.focus(); });

document.getElementById('year').textContent = new Date().getFullYear();
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => toTop.classList.toggle('show', window.scrollY > 500), {passive:true});
toTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
render();
