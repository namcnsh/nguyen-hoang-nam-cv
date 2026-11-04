# Plan thi công cho GPT-6-Luna — Google Ads case study #4

Ngày: 2026-11-04. Đầu vào bắt buộc: [spec thiết kế](../specs/2026-11-04-google-ads-case-study-design.md). **Spec quyết định mọi lựa chọn thiết kế và nội dung; plan này quyết định thứ tự thi công.** Luna chỉ triển khai và báo sai khác nếu ràng buộc kỹ thuật khiến một chi tiết không thể hiện thực, không tự thay concept.

## 0. Điểm xuất phát và quy tắc

- Repo root: `/Users/admin/Desktop/REPO/website-portfolio`. Lệnh shell theo `/Users/admin/.codex/RTK.md`: thêm tiền tố `rtk` cho từng lệnh.
- Trạng thái hiện có là thay đổi địa phương chưa commit: `.gitignore`, `utils/i18n/dictionaries.js`, `app/components/homepage/featured-case-studies/index.jsx`, route `/feng-shui-ads` và component của nó. Bảo toàn các thay đổi này, rồi sửa chúng theo spec; không reset/checkout xóa thay đổi.
- Source of truth về nội dung, số và thẩm mỹ: spec. Nguồn đối chiếu số: hai CSV trong thư mục dữ liệu gốc. Không đưa CSV hoặc ảnh tracking vào `public/`.
- Không cài `shadcn/ui`, thư viện chart, font mới hoặc i18n framework. Dùng Next/React/Tailwind/SCSS/reac-icons sẵn có.
- Không viết thêm hiệu quả kinh doanh, chiến lược tối ưu, doanh thu, ROAS hay đơn hàng thành công. Không đưa cảnh báo cấu hình theo dõi lên website.
- Sản phẩm bàn giao là code địa phương có thể review. Chỉ deploy/push khi có lệnh triển khai riêng hoặc quyền đã được xác nhận trong phiên của agent thi công.

## 1. Áp skill theo trình tự, không đổi quyết định thiết kế

1. Đọc spec toàn bộ. Dùng `design` làm bản đồ các phần: brand hiện tại, token, UI và hero. Tiêu chí xong: liệt kê được bảy khối trang và các file sẽ sửa.
2. Dùng `ui-ux-pro-max` để kiểm tra chính xác các tiêu chí UX của spec: phân cấp, focus, responsive, biểu đồ có nhãn. Không dùng palette Brutalism/hồng từ kết quả tìm kiếm đã bị spec loại. Tiêu chí xong: không có điểm UX nào trái mục 10 spec.
3. Dùng `design-system` để triển khai token ba lớp trong scope của trang mới; dùng giá trị ở mục 5 spec. Tiêu chí xong: các màu/spacing/radius lặp lại được lấy từ token hoặc hằng style duy nhất, không đổi CSS global của trang khác.
4. Dùng `banner-design` cho hero Data / Infographic đã thiết kế; dùng 7 số chi phí thật, không sinh ảnh. Tiêu chí xong: hero có headline rõ hơn đồ họa và bar chart có nhãn.
5. Dùng `ui-styling` để hiện thực React/Tailwind/SCSS, grid, CTA và trạng thái focus. Tiêu chí xong: JSX semantic, responsive theo mục 10 spec.

## 2. Bản đồ file mục tiêu

| Hành động | File | Kết quả |
|---|---|---|
| Sửa | `utils/i18n/dictionaries.js` | VI/EN copy theo mục 6 và 8 spec, metadata route mới, `projects[id=4].demo` và `ctaLabel` |
| Tạo | `utils/data/google-ads-case-study.js` | Một bộ số nguyên cho KPI, quý, 481/226; không trộn text dịch |
| Sửa | `app/components/homepage/featured-case-studies/index.jsx` | Thẻ #4, label CTA riêng, href đúng, icon trong/ngoài phù hợp |
| Sửa | `app/components/homepage/projects/index.jsx` | CTA của project #4 cũng là Xem dữ liệu / View data và cùng href |
| Tạo | `app/google-ads-case-study/page.js` | Route chính, metadata VI/EN theo cookie |
| Tạo | `app/components/google-ads-case-study-page/index.jsx` | Trang case study theo mục 7 spec |
| Tạo nếu cần | `app/components/google-ads-case-study-page/google-ads-case-study.module.scss` | Token scope trang và CSS khó biểu diễn bằng utility |
| Xóa sau khi di chuyển | `app/feng-shui-ads/page.js`, `app/components/feng-shui-ads-page/index.jsx` | Không còn hai trang trùng nội dung |
| Giữ | `.gitignore` | Thư mục dữ liệu nguồn tiếp tục bị loại khỏi Git |

Tên component có thể khác chút nếu cần theo convention repo, nhưng route, copy, nội dung, bố cục và dữ liệu phải đúng. Không sửa `app/page.js` nếu section nổi bật đã được mount như hiện tại; không sửa `app/layout.js` nếu i18n hiện tại đã bao route mới.

## 3. Các task thi công có cổng hoàn thành

### Task 1 — Khóa baseline

1. Đọc `git status --short`, các file trong bảng mục 2, `utils/i18n/config.js`, `app/layout.js`, `package.json`.
2. Đối chiếu hai CSV: header dòng thứ ba, dòng `Tổng số: Chiến dịch`, bảy dòng tổng theo quý. Xác nhận số trong mục 9 spec; chú ý khác biệt giữa dòng chiến dịch và dòng tài khoản. Kiểm tra `.gitignore` đang loại thư mục nguồn.
3. Ghi ngắn trong báo cáo thi công nếu dữ liệu nguồn khác spec; dừng phần hiển thị số bị lệch cho đến khi làm rõ, vẫn có thể làm UI không phụ thuộc số.

**Xong khi:** baseline được ghi nhận, không có file người dùng nào bị xóa ngoài hai file route/component cũ sau khi đã chuyển nội dung.

### Task 2 — Chuẩn hóa số liệu

1. Tạo `utils/data/google-ads-case-study.js` export một object/hằng số với `periodStart`, `periodEnd`, `totals` (`spendVnd: 17679978236`, `conversions: 105269`, `clicks: 57465709`, `impressions: 5280768715`), `campaignRows: 481`, `campaignRowsWithSpend: 226`, và `quarters` gồm bảy dòng đúng mục 9 spec.
2. Giá trị `spendVnd` và `conversions` của quý là number. `label` là mã quý ổn định `Q2 2019`…`Q4 2020`; cờ `partial: true` cho Q2 2019 và Q4 2020 để tạo chú thích.
3. Không lưu thanh phần trăm thủ công; component tính `spendVnd / maxQuarterSpend` và áp giới hạn nhìn thấy tối thiểu 2px cho quý nhỏ nhất.
4. Không nhân đôi dữ liệu số trong dictionary. Dịch nhãn số/đơn vị ở dictionary hoặc formatter theo locale.

**Xong khi:** cùng một nguồn number cấp dữ liệu cho hero, KPI, bảng; tổng bảy quý khớp totals.

### Task 3 — Nội dung VI/EN và metadata

1. Trong `utils/i18n/dictionaries.js`, cập nhật `metadata.googleAdsCaseStudy` cho cả `vi` và `en`. Title: `Google Ads cho sản phẩm phong thủy 2019–2020 - Nguyễn Hoàng Nam` / `Feng Shui Google Ads Case Study 2019–2020 - Nguyễn Hoàng Nam`. Description: diễn đạt phạm vi, không dùng từ doanh thu hoặc đơn hàng thành công.
2. Tạo key `googleAdsCaseStudy` cho các label và câu đúng bảng copy ở mục 8 spec. Key mẫu: `eyebrow`, `title`, `intro`, `back`, `sections`, `context`, `execution`, `timelineIntro`, `source`, `takeaway`, `contactCta`, `kpiLabels`, `quarterLabels`, `partialQuarterNote`. Giữ VI/EN cùng cấu trúc key.
3. Cập nhật project `id: 4`: name/description/tags/role theo mục 6 spec, `demo: "/google-ads-case-study"`, `ctaLabel: "Xem dữ liệu"` ở VI và `"View data"` ở EN. Giữ `id` và vị trí trong mảng. Các project #1–#3 không đổi.
4. Xóa key `fengShuiAds` cũ và `metadata.fengShuiAds` sau khi route mới dùng key mới. Tìm toàn repo các tham chiếu cũ rồi loại hết.
5. Nhãn nút riêng lấy từ `project.ctaLabel`; `dictionary.common.viewDemo` vẫn phục vụ card khác.

**Xong khi:** mọi copy nhìn thấy trên route mới có VI/EN; không có chuỗi tiếng Việt hardcode trong JSX; #4 dùng URL và nút mới.

### Task 4 — Thẻ #4 trang chủ

1. Giữ `selectedProjectIds = [1, 2, 3, 4]`, grid một cột mobile/hai cột desktop và style thẻ chung hiện có.
2. Thêm accent teal riêng #4 theo mục 6 spec, chỉ một lớp viền trên mỏng; không tạo khác biệt lớn về kích thước card. Nội dung thẻ lấy từ project trong dictionary.
3. Nút chọn text `project.ctaLabel ?? viewDemo`, `href=project.demo`; nội bộ (`startsWith("/")`) cùng tab, icon mũi tên phải, không icon external. Ngoài domain mới dùng icon external và `target="_blank"` với `rel="noopener noreferrer"` như hiện có.
4. Trong `app/components/homepage/projects/index.jsx`, dùng cùng quy tắc label và href, giữ mọi project khác đúng hành vi cũ.

**Xong khi:** homepage có đúng một card #4 trong `CASE STUDY NỔI BẬT`; cả card nổi bật và mục Dự án mở cùng route mới, cùng ngôn ngữ.

### Task 5 — Route và bố cục trang mới

1. Tạo `app/google-ads-case-study/page.js` dựa trên pattern `app/seo-growth/page.js`: đọc cookie bằng `cookies()`, `normalizeLocale`, `getDictionary`, trả metadata theo `metadata.googleAdsCaseStudy`, render component trang.
2. Dựng component trang theo đúng thứ tự 7 khối ở mục 4 spec. Dùng một `<h1>`, `<section aria-labelledby>` và H2 có id độc nhất. Giữ Navbar/Footer chung từ layout; không nhân bản.
3. Hero 7/5 desktop, mobile text trước chart; dùng numeric quarters cho chart. Đảm bảo đây là ảnh đồ họa dữ liệu, không có ảnh stock, không gán ý nghĩa doanh thu cho bar.
4. KPI bốn card với formatter VI/EN; nhãn “Google Ads ghi nhận” / “Recorded by Google Ads” dưới conversion. Không dùng số 129.657.
5. Bối cảnh và triển khai đúng ba bullet bản copy chính thức; hiển thị vai trò. Bảng/nhóm theo quý hiển thị đủ bảy quý, cả số chi phí lẫn chuyển đổi. Ghi chú rõ Q2’19/Q4’20 là kỳ không trọn quý.
6. Phần nguồn gồm hai đoạn đúng mục 8; không đưa screenshot tracking hoặc mô tả cảnh báo cấu hình. Card takeaway và CTA `/#contact` như mục 7.5.
7. Sau khi route mới hoàn thành, xóa route/component `/feng-shui-ads` cũ. Vì URL cũ hiện 404 trên domain live và chỉ tồn tại ở local, không cần thêm redirect nội bộ. Nếu lúc Luna thi công URL cũ đã được public hóa, kiểm tra lại rồi dùng redirect 308 sang route mới thay vì xóa trống.

**Xong khi:** `/google-ads-case-study` render đầy đủ với cả hai cookie; `/feng-shui-ads` không hiển thị một bản case study thứ hai.

### Task 6 — CSS, responsive và keyboard

1. Áp token mục 5 spec trong scope trang, dùng Tailwind cho grid/typography/spacing thông thường. Nếu CSS module được tạo, chỉ chứa token và các chi tiết chart/gradient không gọn bằng utility.
2. Chỉnh tại các viewport 375, 768, 1024, 1440px. Không cuộn ngang; nút 44px trở lên; nhãn và bar không chồng nhau; chart 7 thanh đọc được trên mobile.
3. Mọi link có `focus-visible` rõ; icon trang trí `aria-hidden`; bảng có caption/th hoặc card mobile có cặp nhãn–giá trị. Kiểm tra `prefers-reduced-motion`.
4. Không dùng JS animation hoặc dependency mới; không viết inline style động ngoài chiều dài thanh dữ liệu tính từ số gốc.

**Xong khi:** trang đúng bố cục mục 6–7 spec ở cả bốn viewport, có thể dùng toàn bộ bằng bàn phím.

### Task 7 — Kiểm tra và báo cáo

1. Chạy `rtk git diff --check`, `rtk npm run lint`, `rtk npm run build`. Nếu lint/build lỗi từ baseline, xác định rõ lỗi mới hay cũ; sửa lỗi do thay đổi của task.
2. Chạy local server, GET `/` và `/google-ads-case-study` với cookie `portfolio-locale=vi` và `portfolio-locale=en`; xác nhận HTTP 200, `html lang`, title, H1, CTA, số và nhãn tương ứng. Chuyển ngôn ngữ bằng nút UI để kiểm tra state và metadata sau refresh.
3. Kiểm tra link #4 trên homepage và mục Dự án trỏ đúng `/google-ads-case-study`; click dẫn tới trang mới cùng tab. Kiểm tra link `/#contact` về section liên hệ.
4. Dùng browser/screenshot ở 375/768/1024/1440px; kiểm tra card #4, hero, KPI, bảng bảy quý, footer; thử tab/Enter/focus và reduced motion. Soát copy VI/EN theo mục 8 spec. Tìm chuỗi `cảnh báo cấu hình`, `configuration warning`, `03_Conversion_Tracking` trong code hiển thị; kết quả phải rỗng.
5. Xác nhận `git status` không chứa CSV/PNG nguồn. Báo cáo file đã đổi, kết quả kiểm tra, URL local. Không khẳng định URL production đã chạy nếu chưa deploy và GET sau deploy.

**Xong khi:** đủ sáu điều kiện nghiệm thu ở mục 11 spec và không còn sai khác thiết kế chưa được ghi rõ.

## 4. Ghi chú về URL production

`https://nseilhn.online/google-ads-case-study` hiện 308 tới `https://www.nseilhn.online/google-ads-case-study`, sau đó 404 tại thời điểm viết plan. Route trong repo cần là `/google-ads-case-study`; nút nội bộ nên dùng path tương đối để hoạt động đúng trên `www`, domain gốc và preview. Sau khi bản code được triển khai tới dự án Vercel đang phục vụ domain này, xác minh cả URL gốc lẫn `www` trả trang case study với VI/EN. Việc triển khai và liên kết domain là bước riêng sau khi code địa phương đã đạt nghiệm thu.
