<!-- 占比条 -->

<script>
const VALUE_TYPE_ENUM = {
    VALUE: 'value',
    PERCENT: 'percent'
}

export default {
    props: {
        /** 数据类型，[{name, value}] */
        valueList: {
            type: Array,
            default: () => {
                return [
                    {name: 'name1', value: 3},
                    {name: 'name2', value: 100},
                    {name: 'name3', value: 5},
                    {name: 'name3', value: 500}
                ]
            }
        },
        /** 颜色列表 */
        colorList: {
            type: Array,
            default: () => ['#5470c6', '#689255', '#c59d45', '#73c0de', '#3ba272', '#9a60b4']
        },
        /** 数据类型，数值value/百分比percent */
        valueType: {
            type: String,
            default: VALUE_TYPE_ENUM.VALUE
        },
        /** 条宽 CSS height */
        barWidth: String,
        /** 是否显示行内文本 */
        hasTextInside: {
            type: Boolean,
            default: false
        },
        /** 是否显示 tooltip */
        hasTooltip: {
            type: Boolean,
            default: false
        },
        /** 保证 label 可视，仅保证英文数字字符 */
        ensureLabelVisible: {
            type: Boolean,
            default: false
        },
        /** 和为 0 时仍然显示 */
        stillShowZeroBar: {
            type: Boolean,
            default: false
        },
        /** 是否可点击 */
        canClick: {
            type: Boolean,
            default: false
        },
        /** 设置每项的颜色，入参 ({name, value, percent, label,  describe, data}, index)，默认使用内置颜色 */
        setBarItemColorFunc: Function,
        /** 设置行内文本函数，入参 ({name, value, percent, label, describe, data}, index)，默认使用 label 值 */
        setInsideTextFunc: Function,
        /** 设置 tooltip 文本函数，入参 ({name, value, percent, label, describe, data}, index)，默认使用 name：label  */
        setTooltipTextFunc: Function,
    },
    data() {
        return {
            // const
            VALUE_TYPE_ENUM,
        }
    },
    computed: {
        useDataList() {
            if (this.valueType == this.VALUE_TYPE_ENUM.PERCENT) {
                // 值类型为百分比
                return this.valueList.map((item) => {
                    return {
                        name: item.name,
                        value: item.value,
                        percent: `${item.value}%`,
                        label: `${item.value}%`,
                        describes: item.describes,
                        data: item
                    }
                })
            } else {
                // 值类型为数值
                let total = 0
                for (let item of this.valueList) {
                    total += item.value
                }
                return this.valueList.map((item) => {
                    let percent = (total ? item.value / total * 100 : 0) + '%'
                    let showPercent = (total == 0 && this.stillShowZeroBar) ? `${1 / this.valueList.length * 100}%` : percent
                    return {
                        name: item.name,
                        value: item.value,
                        percent,
                        showPercent,
                        label: item.value,
                        describes: item.describes,
                        data: item
                    }
                })
            }
        },
        barStyle() {
            let style = {}
            // 高度
            if (this.hasTextInside == true && this.barWidth) {
                style.height = this.barWidth
            } else if (this.hasTextInside == false) {
                style.height = this.barWidth || '20px'
            }
            return style
        }
    },
    methods: {
        /** 获取颜色 */
        setBarItemColorInnerMethod(index) {
            return this.colorList[index % this.colorList.length]
        },
        itemClick(item){
            if(this.canClick){
                this.$emit("item-click",item);
            }
        }
    },
    render(h) {
        let barItemList = []
        this.useDataList.forEach((item, index) => {
            // 判断是否有行内文字
            let label = (this.setInsideTextFunc ? this.setInsideTextFunc(item, index) : item.label) + ''
            let barItemStyle = {
                width: item.showPercent,
                /** 保证 label 可视 */
                minWidth: (this.hasTextInside && this.ensureLabelVisible) ? `${label.length + 2}ch` : '0px',
                /** 可自定义颜色 */
                backgroundColor: this.setBarItemColorFunc ? this.setBarItemColorFunc(item, index) : this.setBarItemColorInnerMethod(index),
                /** 设置行内文字时，设置内边距 */
                paddingTop: this.hasTextInside ? '2px' : 0,
                paddingBottom: this.hasTextInside ? '2px' : 0
            }
            
            let itemEl = h('div', {
                class: "percent-bar-item",
                style: barItemStyle,
                on: this.canClick?{click : e=>{
                    this.itemClick(item);
                }}:{}
            }, this.hasTextInside ? [<div class="percent-bar-item__text">{label}</div>] : []);
            let describes = [];
            if(item.describes){
                item.describes.forEach(describeItem => {
                    describes.push(<span><br/>{describeItem}</span>)
                });
            }
            let describesEl = h('span',{
                style : {color : '#ccc'}
            },describes);
            barItemList.push(this.hasTooltip ? (
                <el-tooltip>
                    <div slot="content">
                        {this.setTooltipTextFunc ? this.setTooltipTextFunc(item, index) : `${item.name}：${item.label}`}
                        {describesEl}
                    </div>
                    {itemEl}
                </el-tooltip>
            ) : itemEl)
        })
        return (
            <div class="percent-bar" style={this.barStyle}>
                {barItemList}
            </div>
        )
    }
}
</script>

<style>
.percent-bar {
  box-sizing: border-box;
  border-radius: 1000px;
  border: 1px solid #ccc;
  background-color: #eee;
  width: 100%;
  overflow: hidden;
  line-height: normal;
  text-align: left;
  display: inline-flex;
}

.percent-bar-item {
  display: inline-flex;
  justify-content: space-around;
  align-items: center;
  vertical-align: middle;
  position: relative;
  height: 100%;
  transition: all 0.5s ease;
}

.percent-bar-item .percent-bar-item__text {
  position: relative;
  color: white;
  font-family: 'Courier New', Courier, monospace;
  font-weight: bold;
}

.percent-bar-item:hover {
  cursor: pointer;
}
</style>