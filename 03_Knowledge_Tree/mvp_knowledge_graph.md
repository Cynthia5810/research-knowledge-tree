# MVP Knowledge Graph

概念节点来自 `04_Concept_Nodes/`，论文连接来自定位卡的 `concepts` 字段。

```mermaid
flowchart LR
  concept-05414060b73bbbcf["Li-Mg分离"]
  concept-85a95296490a1ae7["Li-Mg选择性"]
  concept-5612d81de4250bac["电渗析"]
  concept-f4bb832fba83254f["离子选择膜"]
  concept-bcea1c87f145b817["膜"]
  concept-ce8ce09c94edcb22["膜材料"]
  concept-54c9d69e4ab86043["表面正电化"]
  concept-ba430b1c39f61cfb["静电排斥"]
  paper-37974a325a0b07d7[["Wang2024HighlyPositivelyCharged"]]
  concept-5612d81de4250bac -->|"used_for"| concept-05414060b73bbbcf
  concept-f4bb832fba83254f -->|"is_a"| concept-ce8ce09c94edcb22
  concept-f4bb832fba83254f -->|"used_for"| concept-05414060b73bbbcf
  concept-f4bb832fba83254f -->|"component_of"| concept-5612d81de4250bac
  concept-f4bb832fba83254f -->|"prepared_by"| concept-54c9d69e4ab86043
  concept-f4bb832fba83254f -->|"has_property"| concept-85a95296490a1ae7
  concept-ce8ce09c94edcb22 -->|"is_a"| concept-bcea1c87f145b817
  concept-54c9d69e4ab86043 -->|"acts_via"| concept-ba430b1c39f61cfb
  concept-54c9d69e4ab86043 -->|"improves"| concept-85a95296490a1ae7
  concept-ba430b1c39f61cfb -->|"improves"| concept-85a95296490a1ae7
  paper-37974a325a0b07d7 -.->|"tagged"| concept-f4bb832fba83254f
  paper-37974a325a0b07d7 -.->|"tagged"| concept-05414060b73bbbcf
  paper-37974a325a0b07d7 -.->|"tagged"| concept-54c9d69e4ab86043
  paper-37974a325a0b07d7 -.->|"tagged"| concept-ba430b1c39f61cfb
  paper-37974a325a0b07d7 -.->|"tagged"| concept-85a95296490a1ae7
```
