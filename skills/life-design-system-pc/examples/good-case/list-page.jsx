import React from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Navbar,
  Menu,
  PageHeader,
  Tabs, Tab, Button, Icon, Filter, FilterGroup,
  TableWrapper, Table, Thead, Tbody, Tr, Th, Td, TableCellProduct, TableCellAmount, TableCellOperation, TableCellAction,
  Pagination
} from '@life-ds/components-web';

const App = () => {
  return (
    <div className="app-container">
      {/* Navbar */}
      <header className="app-navbar">
        <Navbar />
      </header>

      {/* Main Content */}
      <div className="app-main-wrapper">
        <aside className="app-sidebar">
          <div className="app-sidebar__menu">
            <Menu />
          </div>
        </aside>

        <div className="app-body">
          <div className="app-content">
            <PageHeader 
              title="团购商品管理" 
              tabs={
                <Tabs variant="primary" size="small" defaultValue="all">
                  <Tab value="all">全部商品</Tab>
                  <Tab value="selling">出售中</Tab>
                  <Tab value="off">已下架</Tab>
                  <Tab value="review">审核中</Tab>
                </Tabs>
              }
            />
            <div style={{ marginBottom: '24px' }}>
              <FilterGroup size="small" onQuery={() => {}} onReset={() => {}}>
                <Filter
                  type="input"
                  size="small"
                  label="商品名称"
                  placeholder="请输入"
                  value=""
                  onChange={() => {}}
                />
                <Filter
                  type="select"
                  size="small"
                  label="商品状态"
                  placeholder="请选择"
                  onClick={() => {}}
                />
                <Filter
                  type="date"
                  size="small"
                  label="售卖日期"
                  placeholder="请选择"
                  onClick={() => {}}
                />
                <Filter
                  type="time"
                  size="small"
                  label="售卖时间"
                  placeholder="请选择"
                  onClick={() => {}}
                />
              </FilterGroup>
            </div>

            <div className="lds-action-bar">
              <Tabs variant="capsule" size="small" defaultValue="all-member">
                <Tab value="all-member">全部会员可领</Tab>
                <Tab value="target-member">定向会员发放</Tab>
              </Tabs>
              <Button variant="primary" size="default-size" icon={<Icon name="ic-add-round-line" />}>
                新建会员优惠券
              </Button>
            </div>

            <TableWrapper>
              <Table>
                <Thead>
                  <Tr>
                    <Th>商品信息</Th>
                    <Th>价格（元）</Th>
                    <Th>售卖时间</Th>
                    <Th>剩余库存</Th>
                    <Th>待核销</Th>
                    <Th>操作</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td><TableCellProduct img="../../assets/shangpin.png" title="【节假日通用】资生堂烫染护理" tag="团购" tagVariant="default" id="23468723648223" /></Td>
                    <Td><TableCellAmount>￥508.00</TableCellAmount></Td>
                    <Td>2023.08.01 12:00</Td>
                    <Td>10,000</Td>
                    <Td>500</Td>
                    <Td>
                      <TableCellOperation>
                        <TableCellAction>上架</TableCellAction>
                        <TableCellAction>编辑</TableCellAction>
                      </TableCellOperation>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td><TableCellProduct img="../../assets/shangpin.png" title="【工作日可用】高级洗剪吹套餐" tag="热销" tagVariant="orange" id="89345723648224" /></Td>
                    <Td><TableCellAmount>￥128.00</TableCellAmount></Td>
                    <Td>2023.08.02 14:30</Td>
                    <Td>8,500</Td>
                    <Td>240</Td>
                    <Td>
                      <TableCellOperation>
                        <TableCellAction>下架</TableCellAction>
                        <TableCellAction danger>删除</TableCellAction>
                      </TableCellOperation>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableWrapper>

            <div className="lds-pagination-wrapper">
              <Pagination
                total={500}
                defaultCurrent={2}
                defaultPageSize={10}
                pageSizeOptions={[10, 20, 50]}
                showSizeChanger
                showQuickJumper
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
