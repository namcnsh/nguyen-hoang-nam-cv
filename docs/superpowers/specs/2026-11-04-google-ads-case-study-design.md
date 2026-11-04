# Spec thiết kế — Google Ads case study #4

Ngày: 2026-11-04. Người thiết kế: GPT-6-Sol. Người thi công: GPT-6-Luna.

## 1. Quyết định đã chốt

- Thẻ **#4** nằm trong `CASE STUDY NỔI BẬT` trên trang chủ, sau #3. Nút riêng của thẻ ghi **“Xem dữ liệu” / “View data”**.
- Nút dùng đường dẫn nội bộ `/google-ads-case-study`. Trên domain người dùng nêu, URL là `https://nseilhn.online/google-ads-case-study`; domain này hiện chuyển 308 sang `https://www.nseilhn.online/google-ads-case-study`. Tại thời điểm khảo sát, URL đích trả 404 vì route chưa được triển khai. Đây là một **đường dẫn trên domain**, không phải subdomain DNS mới.
- Trang mới là một case study biên tập cho nhà tuyển dụng: câu chuyện ngắn, bằng chứng định lượng, phạm vi triển khai, biểu đồ theo quý, nguồn dữ liệu và kết luận nghề nghiệp. Không phải dashboard tương tác hay bản sao giao diện Google Ads.
- Cả trang chủ và trang mới dùng cùng hệ VI/EN đang có: cookie `portfolio-locale`, `I18nProvider`, `getDictionary`, mặc định `vi`; thay đổi ngôn ngữ không đổi URL.
- Thông điệp bằng số: chi phí chiến dịch **17.679.978.236 VND**, **105.269 lượt chuyển đổi Google Ads ghi nhận**, **57.465.709 lượt nhấp**, **5.280.768.715 lượt hiển thị** trong 01/05/2019–31/10/2020. Lượt chuyển đổi được gọi đúng như chỉ số nền tảng, không gọi là đơn mua thành công, doanh thu hay ROAS.
- Dải giá **300.000–20.000.000 VND** và vai trò triển khai do chủ portfolio cung cấp. Báo cáo CSV không tách hiệu quả từng sản phẩm hoặc dải giá.
- Không hiển thị trên website cảnh báo cấu hình theo dõi hoặc ảnh `03_Conversion_Tracking.png`. Nội dung công khai chỉ giải thích trung tính định nghĩa của lượt chuyển đổi.
- Thư mục dữ liệu nguồn ở root đang được `.gitignore` loại trừ; không chép CSV hoặc ảnh nguồn vào `public/`.

## 2. Căn cứ quan sát trong repo và dữ liệu

- Stack: Next.js 16 App Router, React 19, Tailwind CSS 4, SCSS, Inter từ `next/font/google`.
- Trang chủ: `app/page.js`; thẻ nổi bật: `app/components/homepage/featured-case-studies/index.jsx`; dữ liệu và bản dịch: `utils/i18n/dictionaries.js`.
- Bản nháp địa phương hiện có route `/feng-shui-ads` và component `app/components/feng-shui-ads-page/index.jsx`; cả hai chưa được commit. Đặc tả này **thay thế** bản nháp bằng route `/google-ads-case-study`, không tạo hai trang nội dung trùng nhau.
- `01_Campaign_Performance.csv` và `02_Quarter_Performance.csv` có cùng khoảng ngày. Dòng “Tổng số: Chiến dịch” cho tổng kỳ là nguồn của bốn KPI. Dòng “Tổng số: Tài khoản” có phạm vi khác và không dùng cho các KPI này. Báo cáo có 481 dòng chiến dịch; 226 dòng có chi phí > 0.
- Báo cáo theo quý có 7 dòng tổng theo chiến dịch tương ứng 7 quý; Q2 2019 bắt đầu từ 01/05 và Q4 2020 kết thúc 31/10. Đơn vị chi phí VND.
- Giao diện hiện có nền #05070F đến #0D1024, card tối, accent violet/teal và Inter. Giữ ngôn ngữ hình ảnh này để case study là phần tự nhiên của portfolio.

## 3. Skill thiết kế đã áp dụng và chỉ dẫn cho Luna

| Skill | Vai trò trong thiết kế này | Quyết định cụ thể đã chốt | Luna thực hiện |
|---|---|---|---|
| `design` | Điều phối thiết kế tổng thể | Case study là trang editorial có lớp dữ liệu, cùng nhận diện portfolio | Dùng tài liệu này làm nguồn thiết kế; không tạo logo, font hay concept khác |
| `ui-ux-pro-max` | Thứ bậc nội dung, UX, responsive, accessibility | Mở bằng hook và KPI, sau đó bối cảnh → phạm vi triển khai → dữ liệu quý → cách đọc → kết luận; mọi số biểu đồ có nhãn văn bản; focus rõ, không phụ thuộc hover | Áp các quy tắc UX, đọc kết quả tìm kiếm theo ngữ cảnh; không thay style bằng gợi ý máy móc |
| `design-system` | Token và tính nhất quán | Dùng ba lớp primitive → semantic → component theo mục 5, scope cho trang mới; card #4 dùng token cùng hệ | Đặt token đúng giá trị đã chốt, không đổi màu global của trang khác |
| `ui-styling` | Hiện thực Tailwind/React | Grid mobile first, card, CTA, bảng và thanh dữ liệu bằng HTML/CSS; không thêm thư viện UI | Dựng đúng thông số mục 5–8, semantic HTML và trạng thái focus |
| `banner-design` | Art direction hero | Hero kiểu **Data / Infographic + Dark Mode**: headline là trọng tâm, đồ họa là 7 thanh quý từ dữ liệu thật; dùng CSS/SVG, không dùng ảnh sản phẩm hoặc hình AI | Dựng hero theo mục 6, không phát minh số hoặc dùng ảnh minh họa phong thủy không có nguồn |

Kết quả tra `ui-ux-pro-max` cho từ khóa portfolio trả về Brutalism/hồng. Gợi ý này không khớp giao diện repo nên không dùng palette hoặc font của nó. Giữ các hướng dẫn phù hợp đã tra được: phân cấp kể chuyện, tab order, focus visible, data labels và bản đọc thay thế cho biểu đồ. Đây là lựa chọn thiết kế đã chốt, Luna không tra để chọn hướng khác.

## 4. Mục tiêu người xem và luồng đọc

Nhà tuyển dụng cần nhận ra trong 10 giây: (1) ngành và giai đoạn, (2) vai trò, (3) quy mô dữ liệu, (4) sự thận trọng khi đọc chỉ số. Luồng cuộn một cột theo thứ tự sau:

1. Hero: lĩnh vực, vai trò, thời gian, một câu giá trị; góc phải là đồ họa dữ liệu 7 quý.
2. Bốn KPI: chi phí, chuyển đổi nền tảng, nhấp, hiển thị.
3. Bối cảnh & vai trò: dải giá do chủ portfolio nêu và phạm vi báo cáo.
4. Triển khai được ghi nhận: mạng quảng cáo, hình thức giá thầu, số chiến dịch có chi phí.
5. Quy mô theo quý: thanh ngang mã hóa **chi phí**; số lượt chuyển đổi hiển thị dạng chữ ở cột riêng. Bảng là nguồn đọc chính, đồ họa chỉ hỗ trợ so sánh.
6. Nguồn số liệu & cách đọc: nêu nguồn Google Ads, định nghĩa chuyển đổi, phạm vi dải giá.
7. Kết luận nghề nghiệp + CTA liên hệ.

Không thêm carousel, bộ lọc, nút chuyển metric, parallax hay animation theo cuộn. Dữ liệu chỉ có 7 quý và đọc một lần; tương tác đó không tăng giá trị cho nhà tuyển dụng.

## 5. Design system cụ thể

### 5.1 Token

| Lớp | Token đề xuất | Giá trị | Mục đích |
|---|---|---|---|
| Primitive | `--case-ink-950` | `#050816` | nền sâu |
| Primitive | `--case-ink-900` | `#080D20` | nền chuyển sắc |
| Primitive | `--case-ink-800` | `#121A2B` | mặt card |
| Primitive | `--case-violet-500` | `#8B5CF6` | dấu nhấn chính |
| Primitive | `--case-violet-200` | `#DDD6FE` | chữ nhấn trên nền tối |
| Primitive | `--case-teal-300` | `#5EEAD4` | nhấn dữ liệu |
| Primitive | `--case-white` | `#FFFFFF` | tiêu đề |
| Primitive | `--case-slate-200` | `#E2E8F0` | thân bài |
| Primitive | `--case-slate-400` | `#94A3B8` | nhãn phụ |
| Semantic | `--case-bg`, `--case-surface`, `--case-text`, `--case-muted`, `--case-accent` | ánh xạ lần lượt tới ink-950, ink-800, white, slate-200, teal-300 | vai trò màu |
| Component | `--case-card-border`, `--case-card-radius`, `--case-card-pad`, `--case-focus` | `rgba(255,255,255,.12)`, `28px`, `24px`, `#5EEAD4` | card và điều hướng |

Token đặt trong scope trang, ví dụ `.google-ads-case-study`; chỉ thêm vào CSS khi cần để tránh lặp màu. Không sửa màu nền `body` toàn site. Trên mobile card padding 20px; desktop 28px. Border 1px; shadow mềm `0 20px 60px rgba(0,0,0,.22)`; không dùng blur dày trên toàn trang.

### 5.2 Chữ và nhịp

- Dùng **Inter hiện có**, không tải thêm font. H1 36px/1.12 ở mobile, 52px/1.08 ở desktop, weight 700; tối đa khoảng 16 ký tự tiếng Việt mỗi dòng bằng chiều rộng khối, không ép xuống dòng thủ công khác nhau giữa VI/EN.
- H2 24px/1.25 mobile, 30px/1.2 desktop, weight 650–700. KPI value 30px mobile, 36px desktop, tabular numerals. Thân bài 16px/1.65; chú thích 14px/1.5. Nhãn eyebrow tối thiểu 12px/1.5.
- Chiều rộng nội dung tối đa 1152px; đoạn văn tối đa 68–72 ký tự. Lề ngang 20px mobile, 32px tablet, theo container hiện có trên desktop. Khoảng cách section 48px mobile, 72px desktop; card gap 16/24px.
- Đảm bảo tương phản chữ thân và nút tối thiểu 4.5:1, focus ring 2px teal có offset 3px, vùng bấm nút tối thiểu 44px.

## 6. Thiết kế trang chủ: thẻ case study #4

- Giữ section `#featured-case-studies` và thứ tự `[1,2,3,4]`; grid một cột dưới 1024px, hai cột từ 1024px. Bốn card bằng chiều cao theo hàng. Card #4 giữ cấu trúc card đang có để cùng hệ; chỉ thêm dấu nhấn teal tinh tế ở viền trên và label `Google Ads · 2019–2020`, không thay thiết kế các card #1–#3.
- Badge `#4` ở góc trái trên. H3: **“Google Ads cho sản phẩm phong thủy (2019–2020)”** / **“Google Ads for Feng Shui Products (2019–2020)”**. Mô tả hai câu tối đa 3–4 dòng trên desktop, cho phép dài hơn trên mobile; không cắt chữ bằng ellipsis.
- Mô tả VI: “Triển khai quảng cáo cho sản phẩm phong thủy giá 300.000–20.000.000đ. Báo cáo theo chiến dịch ghi nhận 17,68 tỷ đồng chi phí và 105.269 lượt chuyển đổi trên Google Ads.”
- Mô tả EN: “Ran ads for feng shui products priced VND 300,000–20,000,000. The campaign report records VND 17.68B in spend and 105,269 conversions on Google Ads.”
- Tag: `Google Ads`, `Search`, `Display`, `Campaign Reporting`; cùng style chip các card khác. Role hiển thị `Digital Marketing Specialist`.
- Nút duy nhất của card #4: **“Xem dữ liệu” / “View data”**; icon mũi tên sang phải thay icon mở link ngoài; `href="/google-ads-case-study"`, điều hướng cùng tab. Giữ nhãn “Xem demo / View demo” của các card khác. Vì #4 còn xuất hiện ở mục `Dự án`, nút ở đó cũng phải dùng cùng nhãn và URL để không gây mâu thuẫn.
- Hover: card dịch lên 4px trong 200–300ms và viền sáng hơn; focus của nút rõ mà không cần hover. Tôn trọng `prefers-reduced-motion` đã có trong `globals.scss`.

## 7. Thiết kế trang chi tiết

### 7.1 Hero

- Vùng hero cao theo nội dung, không đặt `min-height: 100vh`; card nền gradient ink-800 → ink-900, radius 28–32px. Desktop chia 7/12 cho chữ, 5/12 cho đồ họa; mobile xếp chữ trước, dữ liệu sau.
- Trên trái: eyebrow `GOOGLE ADS · 2019–2020`, H1 **“Quảng cáo sản phẩm phong thủy ở quy mô lớn”** / **“Feng shui advertising at campaign scale”**; đoạn mô tả 2 câu ở mục 8; hàng chip `01/05/2019–31/10/2020`, `300.000–20.000.000đ` (EN định dạng tương ứng).
- Link quay về trang chủ ở góc phải desktop, dưới H1 mobile; icon mũi tên trái, label theo ngôn ngữ. Đây là link điều hướng, không cạnh tranh với CTA liên hệ cuối trang.
- Bên phải: 7 thanh dọc hoặc ngang cho chi phí theo quý, có nhãn Q2’19 … Q4’20 và giá trị nổi bật Q4’19 = 6,08 tỷ. Dùng dữ liệu số ở mục 9, thanh lớn nhất 100%; Q4’20 vẫn hiện tối thiểu 2px và giá trị dạng chữ. Caption “Chi phí quảng cáo theo quý” / “Quarterly ad spend”. Không dùng hình ảnh sản phẩm, biểu tượng phong thủy, số giả hoặc screenshot Google Ads.

### 7.2 KPI strip

- Bốn card thứ tự: Chi phí, Lượt chuyển đổi Google Ads, Lượt nhấp, Lượt hiển thị. Desktop 4 cột; tablet 2; mobile 1. Mỗi card: nhãn 12px, số lớn 30–36px, mô tả 14px. Chi phí/nhấp/hiển thị ghi “Tổng theo chiến dịch”; chuyển đổi ghi “Google Ads ghi nhận”.
- Không dùng `129.657` của dòng tổng tài khoản. Giá trị hiển thị: VI `17,68 tỷ ₫`, `105.269`, `57,47 triệu`, `5,28 tỷ`; EN `VND 17.68B`, `105,269`, `57.47M`, `5.28B`. Dữ liệu số chính xác lưu dưới dạng number cho kiểm tra.

### 7.3 Bối cảnh và triển khai

- Hai card cân bằng desktop, xếp dọc mobile. Card bối cảnh có H2, đoạn văn tối đa 3 câu; một dòng dữ kiện `Vai trò / Role: Digital Marketing Specialist`.
- Card triển khai có H2 và 3 bullet đánh số `01/02/03`: Search, Display, Demand Gen; các kiểu bid xuất hiện trong CSV; 226/481 dòng chiến dịch có chi phí. Không viết thêm cách tối ưu, phân khúc hay kết quả bán hàng không có chứng cứ.

### 7.4 Theo quý

- H2 và một câu giải thích. Desktop: bảng 4 cột `Quý / Chi phí / Lượt chuyển đổi / Thanh so sánh`; mobile: từng hàng là card nhỏ với nhãn trực tiếp, không cuộn ngang. Thanh chỉ mã hóa chi phí, không dùng cùng thang cho chuyển đổi. Độ dài = chi phí quý / 6.077.884.873 × 100%, dùng số gốc để tính, không hardcode phần trăm hiển thị.
- Bảng dùng `<table>` nếu giữ được trên mobile; nếu đổi sang list/card mobile, phải còn cặp nhãn–giá trị đầy đủ. Q2’19 và Q4’20 có chú thích kỳ chưa trọn quý.

### 7.5 Nguồn & kết luận

- H2 “Nguồn số liệu & cách đọc” / “Sources & interpretation”; hai đoạn ngắn: (a) báo cáo Google Ads theo chiến dịch và theo quý, 01/05/2019–31/10/2020; (b) 105.269 là lượt chuyển đổi nền tảng, không phải đơn mua thành công đã xác nhận. Không nêu cảnh báo cấu hình, ảnh tracking, doanh thu giả định hay ROAS.
- Card kết luận nền teal nhẹ: “Tôi có kinh nghiệm triển khai và đọc dữ liệu quảng cáo ở quy mô lớn, đồng thời phân biệt chỉ số nền tảng với kết quả kinh doanh đã xác nhận khi báo cáo hiệu quả chiến dịch.” / bản EN ở mục 8.
- CTA cuối: “Liên hệ trao đổi” / “Discuss my experience”, link `/#contact`, nút nền trắng chữ #070913; chỉ một CTA chính trong phần kết. Có link quay lại trang chủ phụ nếu cần, cùng ngôn ngữ.

## 8. Copy chính thức song ngữ cho trang chi tiết

Luna dùng các câu sau làm nguồn nội dung, thay bản nháp hiện tại. Chỉ chỉnh dấu câu để phù hợp hiển thị; không thêm thành tích.

| Vị trí | VI | EN |
|---|---|---|
| H1 | Quảng cáo sản phẩm phong thủy ở quy mô lớn | Feng shui advertising at campaign scale |
| Hero intro | Tôi triển khai Google Ads cho sản phẩm phong thủy có giá từ 300.000đ đến 20.000.000đ. Báo cáo giai đoạn 01/05/2019–31/10/2020 cho thấy quy mô triển khai và hiệu suất được nền tảng ghi nhận. | I ran Google Ads for feng shui products priced from VND 300,000 to VND 20,000,000. Reports from May 1, 2019 to October 31, 2020 show the scale of execution and performance recorded by the platform. |
| Context H2 | Bối cảnh & vai trò | Context & role |
| Context body | Dải giá sản phẩm rộng khiến việc theo dõi hiệu quả ở cấp chiến dịch trở nên quan trọng. Tôi trực tiếp triển khai quảng cáo trong giai đoạn này. Báo cáo không tách kết quả theo từng sản phẩm hoặc mức giá. | The broad product price range made campaign-level monitoring important. I ran the advertising during this period. The reports do not isolate results by product or price tier. |
| Execution H2 | Phạm vi triển khai được ghi nhận | Documented execution scope |
| Execution 1 | Báo cáo có chiến dịch trên Mạng tìm kiếm, Mạng hiển thị và nhóm Tạo nhu cầu. | The export includes Search, Display, and Demand Gen campaigns. |
| Execution 2 | Các chiến dịch dùng nhiều cách đặt giá thầu, gồm CPC thủ công, CPC nâng cao, CPA mục tiêu và tối đa hóa chuyển đổi. | Campaigns used manual CPC, enhanced CPC, target CPA, and maximize conversions bidding. |
| Execution 3 | Trong 481 dòng chiến dịch, 226 dòng có phát sinh chi phí quảng cáo. | Of 481 campaign rows, 226 recorded advertising spend. |
| Timeline H2 | Quy mô theo quý | Quarterly scale |
| Timeline intro | Mỗi thanh thể hiện chi phí của một quý; lượt chuyển đổi được ghi riêng để dễ đối chiếu. | Each bar shows a quarter’s ad spend; conversions are listed separately for comparison. |
| Source H2 | Nguồn số liệu & cách đọc | Sources & interpretation |
| Source 1 | Số liệu lấy từ báo cáo Google Ads theo chiến dịch và theo quý cho giai đoạn 01/05/2019–31/10/2020. Các KPI toàn kỳ dùng dòng tổng theo chiến dịch. | Figures come from Google Ads campaign and quarterly reports for May 1, 2019 to October 31, 2020. Period KPIs use the campaign total row. |
| Source 2 | 105.269 là lượt chuyển đổi Google Ads ghi nhận, không phải số đơn mua hàng thành công đã được xác nhận. | The 105,269 conversions were recorded by Google Ads; they are not confirmed successful purchases. |
| Takeaway H2 | Điều tôi mang tới đội ngũ | What I bring to a team |
| Takeaway | Tôi có kinh nghiệm triển khai và đọc dữ liệu quảng cáo ở quy mô lớn, đồng thời phân biệt chỉ số nền tảng với kết quả kinh doanh đã xác nhận khi báo cáo hiệu quả chiến dịch. | I bring experience running and reading advertising data at scale, while distinguishing platform metrics from confirmed business outcomes in campaign reporting. |
| Back | Về trang chủ | Back to home |
| Contact | Liên hệ trao đổi | Discuss my experience |

## 9. Dữ liệu biểu đồ và định dạng

Dữ liệu chi phí và chuyển đổi dưới đây lấy từ dòng “Tổng số: Chiến dịch” của từng quý. Lưu số nguyên, không lưu chuỗi đã định dạng để tránh VI/EN lệch số.

| Quý | Chi phí VND | Chuyển đổi Google Ads |
|---|---:|---:|
| Q2 2019 (01/05–30/06) | 533.750.218 | 4.383 |
| Q3 2019 | 710.261.059 | 5.202 |
| Q4 2019 | 6.077.884.873 | 31.682 |
| Q1 2020 | 5.530.054.636 | 32.712 |
| Q2 2020 | 3.425.050.261 | 22.095 |
| Q3 2020 | 1.388.803.750 | 9.076 |
| Q4 2020 (01/10–31/10) | 14.173.439 | 119 |

Tổng bảy quý bằng 17.679.978.236 VND và 105.269 chuyển đổi. Q4’20 hiển thị `14,17 triệu ₫` / `VND 14.17M` thay vì làm tròn thành `0,01 tỷ`, để tránh làm mất ý nghĩa số nhỏ. Trên các quý khác có thể dùng tỷ VND làm tròn hai chữ số ở biểu đồ; bảng hoặc nhãn chi tiết cần cho phép đọc số chính xác.

## 10. Responsive, chuyển động và accessibility

- 375px: không tràn ngang, H1 không che biểu đồ; hero một cột; KPI một cột; quý mỗi dòng có nhãn và số rõ. 768px: KPI hai cột, bối cảnh/triển khai vẫn có thể một cột. 1024px: hero 7/5, KPI bốn cột, bối cảnh/triển khai hai cột. 1440px: content không vượt 1152px.
- `html lang` theo cookie; `h1` duy nhất; H2 theo đúng thứ tự; bảng có `caption` và `th scope`, hoặc list có nhãn trực tiếp. Tránh dùng `aria-label` chung của KPI bằng tên section quý.
- Thanh dữ liệu phải có số dạng chữ bên cạnh; màu không là nguồn thông tin duy nhất. Link và CTA có focus ring; tab order theo DOM; icon trang trí `aria-hidden`.
- Chuyển động chỉ ở hover/focus card và CTA, 200–300ms, transform/opacity. `prefers-reduced-motion` tắt các hiệu ứng; nội dung luôn đọc được khi không chạy animation.
- Metadata VI/EN riêng ở route; title mô tả ngành, giai đoạn và Nguyễn Hoàng Nam. Canonical URL `https://www.nseilhn.online/google-ads-case-study` nếu cấu hình domain hiện tại vẫn là www khi triển khai.

## 11. Tiêu chí nghiệm thu thiết kế

1. Homepage hiển thị đúng bốn case study theo thứ tự; #4 có nhãn và nút riêng `Xem dữ liệu / View data` trỏ `/google-ads-case-study` cùng tab. Mục `Dự án` trỏ cùng route.
2. Trang mới có đủ bảy khối mục 4, đúng copy VI/EN, đúng số mục 9; không có nội dung cảnh báo cấu hình.
3. Mọi con số trên hero/KPI/biểu đồ dùng cùng nguồn số nguyên; số chuyển đổi không được gọi là đơn hàng.
4. Tại 375/768/1024/1440px không có tràn ngang, mất chữ, thanh dữ liệu không nhãn hoặc CTA khó bấm.
5. Chuyển VI↔EN trên trang mới đổi toàn bộ chữ, metadata theo cookie, không đổi URL; đi về homepage vẫn giữ ngôn ngữ.
6. Route cũ `/feng-shui-ads` không còn là trang nội dung trùng lặp. Dữ liệu CSV/ảnh nguồn vẫn ngoài Git.
