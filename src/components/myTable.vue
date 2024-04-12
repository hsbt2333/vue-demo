
<template>
    <div>
        <el-table
        :data="tableData"
        style="width: 100%">
            <el-table-column
                prop="date"
                label="日期"
                width="180">
            </el-table-column>
            <el-table-column
                prop="name"
                label="姓名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="address"
                label="地址">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data(){
        return {
            tableData: []
        }
    }
}
</script>
<style scoped>
.el-table .el-table__body tr.current-row td {
  background-color: #f9e6e8;
  border-bottom-color: #f49a93;
}

.el-table .pre-row_active td,
.el-table .pre-row_active th {
  border-bottom-color: #f49a93;
}

.el-table .el-table__column-filter-trigger {
  margin-left: 7px;
}

.el-table .el-table__expand-icon--expanded .el-icon-arrow-right {
  -ms-transform: rotate(90deg);
}

.el-table .el-table__header tr > th {
  text-align: center;
  padding: 6px 0;
}

.el-table .el-table__body tr > td {
  cursor: default;
  padding: 6px 0;
}

.el-table .el-table__body-wrapper {
  height: 100%;
}

.el-table .cell .caret-wrapper {
  display: inline-table;
}

.el-table .cell .radio-cell .el-radio__label {
  display: none;
}

.ie9 .el-table-filter .el-scrollbar__view {
  display: inline-block;
}

.ie9 .el-table-filter .el-scrollbar__view .el-table-filter__checkbox-group {
  padding: 10px 0;
}

.ie9 .el-table-filter .el-scrollbar__view .el-table-filter__checkbox-group .el-checkbox__input.is-checked .el-checkbox__inner::after {
  -ms-transform: rotate(45deg) scaleY(1);
}
</style>