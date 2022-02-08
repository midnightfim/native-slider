import React  from 'react';
import {isMobile} from 'react-device-detect';
import './App.scss';

const posterWidth = 250;

enum ScrollTypesEnum {
    LEFT = 'LEFT',
    RIGHT = 'RIGHT'
}

const throttle = (fn: any, wait: any) => {
    let time = Date.now();
    return () => {
        if ((time + wait - Date.now()) < 0) {
            fn();
            time = Date.now();
        }
    }
}

/* компонент нативного слайдера
*
*  определяем девайс пользователя (сейчас работает 1 раз при начальном рендере, при переключении режимов в консоли обновлять страницу)
*  - на touch девайсах скролл включаем
*  - на пк делаем стрелки
*
*
*  для более сложных задач:
*    обычно скролл мышкой на десктопе убирают и оставляют стрелки, но есть есть нужда то нужно обрабатывать событие
*    mousedown и из него начинать обрабатывать mousemove, mouseup
*
*  если есть потребность сделать автодоводку по скроллу стрелками:
*    простой способ: у всех карточек одинаковая ширина + паддинг/маржин и всегда показывается целое число элементов => высчитываешь это значение каждый раз перед скроллом и скроллишь
*    сложный способ: нужно считать ширину вего контента в слайдере => находить граничный элемент вычислениями(свойство scrollLeft у контейнер элемента(стрелка влево = scrollLeft; стрелка вправо = scrollLeft + ширина видимой зоны))
*                       => от него отсчитывать numElementsToScroll => скроллить
*
*  возможные проблемы:
*    IE, Safari(он не так считает маржины и ширину элемента), Firefox(была проблемка со скроллом мышкой)
*    функция trottle не доработано(доработать так, чтобы не пропускало последнее значение)
*/

export class App extends React.Component<any, any> {
    private scrollPosition = 0;
    private containerElement!: HTMLDivElement;

    componentDidMount() {
        this.containerElement = document.querySelector(`.slider-container`) as HTMLDivElement;

        this.containerElement.addEventListener('scroll', throttle(() => {
            this.scrollPosition = this.containerElement.scrollLeft;
            console.log(this.scrollPosition);
        }, 50))
    }

    scrollHandler(type: ScrollTypesEnum, numElementsToScroll: number = 2): void {
        this.containerElement.scrollTo({
            left: this.scrollPosition + (
                (type === ScrollTypesEnum.LEFT)
                    ? -(numElementsToScroll * posterWidth)
                    : (numElementsToScroll * posterWidth)
            )
        })
    }

    getPosters() {
        const array = new Array(10).fill('');
        return array.map((item, i) => {
            return <div key={i} className='poster-item'><span className={"unselectable"}>POSTER</span></div>
        })
    }

    render() {
        return (
            <div className="App">
                {
                    isMobile || <div onClick={() => {
                        this.scrollHandler(ScrollTypesEnum.LEFT)
                    }} className={"arrow left-arrow"}>
                        <span className={"unselectable"}>L</span>
                    </div>
                }
                <div
                    className={(isMobile ? "mobile-slider-container" : "desktop-slider-container") + " slider-container"}>
                    {this.getPosters()}
                </div>
                {
                    isMobile || <div onClick={() => {
                        this.scrollHandler(ScrollTypesEnum.RIGHT)
                    }} className={"arrow right-arrow"}>
                        <span className={"unselectable"}>R</span>
                    </div>
                }
            </div>
        );
    }
}

export default App;
