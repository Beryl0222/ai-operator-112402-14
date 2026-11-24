# 笔迹个性化的分组 Gram 积累与权重交接

项目资料使用可独立读写的 JSON。Node.js 22.23.4 下运行 `npm ci --offline` 准备环境，然后运行 `npm run inspect` 检查合成数据字段，运行 `npm test` 校验样本引用及格式。

## 输入契约

每笔属于 (writer, calibration, stroke)，revision 增大时替换标签或撤下。特征分片组齐后按校准规则 z=(x-center)/scale。未到、明确未观测、测得为零分别登记，明确未观测用包的 fill 规则。目标准则为 ||XW-Y||²+λ||W||²，标签为固定字符表的 one-hot。消费端核对同 writer、校准和字符表。允许使用累加块的较低精度，但以当前有效资料形成的参考正规方程残差逐列比较相对容差。预算计运行时所持统计和解的临时数据。 每个类别的正规方程为 AW=B，A=XᵀX+λI，B=XᵀY。残差口径为 max(abs(AW-B))/max(1,max(abs(B)))，逐列比较。

## 资料读取

样本位于 `inputs/session.json`，其中 `events` 是按到达顺序记下的操作，编号从零开始。chunk 指笔迹及其分片下标；label 以笔迹 ID、修订、字符更正，withdraw 以 ID 与修订撤回，publish 决定书写人和校准版本的交接。
