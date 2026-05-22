---
title: RAG 성능을 결정짓는 PDF 파싱 및 멀티모달 활용 팁
summary: RAG 시스템의 성능을 극대화하기 위한 PDF 구조적 파싱 전략, 멀티모달 LLM을 활용한 도표 지식화, 그리고 하이브리드 검색 및 리랭킹 최적화 노하우를 공유합니다.
keywords: [RAG, PDF Parsing, Multimodal LLM, Hybrid Search, Vector DB]
---

# RAG 성능을 결정짓는 PDF 파싱 및 멀티모달 활용 팁

InsightDigest 프로젝트를 진행하며 PDF 문서에서 단순 텍스트 추출 이상의 가치를 만들어내기 위해 고민했던 기술적 포인트들을 정리합니다.

## 1. PDF는 텍스트 뭉치가 아니다: 구조적 파싱의 중요성

대부분의 RAG 시스템이 실패하는 이유는 PDF를 단순 문자열로만 읽기 때문입니다.

- **문제**: 표(Table) 데이터를 텍스트로만 읽으면 행과 열의 관계가 깨져서 LLM이 엉뚱한 수치를 답변합니다.
- **해결책**: 
    - `Unstructured`나 `PyMuPDF`의 테이블 추출 기능을 사용하여 표를 **Markdown 형식**으로 변환하세요. LLM은 Markdown 표 구조를 매우 잘 이해합니다.
    - 레이아웃 분석(Layout Analysis)을 통해 머리말(Header)과 꼬리말(Footer)을 제거해야 노이즈 없는 인덱싱이 가능합니다.

## 2. 멀티모달 LLM을 활용한 이미지 지식화

문서 내의 다이어그램이나 그래프는 텍스트보다 더 많은 정보를 담고 있는 경우가 많습니다.

- **팁**: 모든 이미지를 다 분석하면 비용이 많이 듭니다. 이미지의 크기나 문서 내 위치(캡션 유무)를 기준으로 유의미한 도표만 필터링하세요.
- **워크플로우**: 
    1. PDF에서 이미지만 따로 추출.
    2. GPT-4o Vision API에 "이 도표가 설명하는 핵심 데이터와 결론을 텍스트로 요약해줘"라고 요청.
    3. 요약된 텍스트를 해당 이미지가 있던 위치의 텍스트와 함께 벡터 DB에 저장.

## 3. 검색 품질을 높이는 하이브리드 전략

단순 벡터 유사도(Semantic Search)만으로는 고유 명사나 특정 수치를 찾기 어려울 때가 있습니다.

- **Hybrid Search**: `ChromaDB`나 `Pinecone`에서 제공하는 벡터 검색과 `BM25` 알고리즘 기반의 키워드 검색을 7:3 비율로 섞어보세요.
- **Reranking**: 검색 결과 상위 10개를 가져온 뒤, `Cohere Rerank` 같은 모델을 써서 질문과 가장 관련 있는 순서로 재정렬하면 답변의 정확도가 비약적으로 상승합니다.

---

### 관련 리소스
- [LangChain Documentation](https://python.langchain.com/)
- [Unstructured.io](https://unstructured.io/)
- [Neo4j Graph Academy](https://graphacademy.neo4j.com/)
