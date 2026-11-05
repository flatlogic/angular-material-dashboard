# AngularJS security backports

The package versions remain 1.8.3. No patched upstream version is fabricated,
and no advisory is dismissed. `node build/patch-angularjs.cjs` checks exact
package versions, pristine source/minified/map SHA256 values and every patch
SHA256 in `manifest.json`. It applies with zero fuzz, regenerates the minified
bundles and their source maps, and validates all inputs before writing. Known
patched inputs are reversed and verified for repeatable builds. Unknown changes
fail loudly. Both installation and builds run this step.

The unchanged MIT-licensed Debian patches come from angular.js `1.8.3-3`:
https://deb.debian.org/debian/pool/main/a/angular.js/angular.js_1.8.3-3.debian.tar.xz
The archive digest is in the manifest; Debian copyright/license is retained.

| Finding | Applied fix or boundary |
| --- | --- |
| CVE-2022-25844 | Debian currency formatting backport |
| CVE-2023-26116 | Debian RegExp copy flags backport |
| CVE-2023-26118 | Debian URL input regular expression backport |
| CVE-2024-21490 / CVE-2024-8372 | Debian srcset sanitizer, plus local compatible URL tokenization |
| CVE-2024-8373 | Debian source-element srcset policy backport |
| CVE-2025-0716 | Debian SVG image URI context backport |
| CVE-2025-2336 | Debian SVG sanitizer image policy backport |
| CVE-2026-11998 | Local whole-RegExp alternation grouping fix |
| CVE-2025-4690 | Local linky email-token boundary fix |
| CVE-2023-26117 | `angular-resource` / `$resource` is not installed or included by this application |
| CVE-2022-25869 | Internet Explorer's textarea history-cache issue remains unverified/unfixed; current Chrome is the tested browser |

The local SCE change groups `matcher.source` before applying both anchors.
Positive tests preserve both allowed alternatives; the previously accepted
prefix/suffix attacker URLs are rejected. Primary description:
https://security-tracker.debian.org/tracker/CVE-2026-11998

The local linky change prevents restarting email matches inside the same ASCII
email-username token. Original capture positions, explicit `mailto:`, HTTP(S),
FTP and `www` handling remain intact. The exploit-sized non-link text times out
on pristine code and completes after the patch. It uses RegExp lookbehind, so
this backport targets current browsers, not Internet Explorer. Primary source:
https://security-tracker.debian.org/tracker/CVE-2025-4690

The unchanged Debian srcset patch splits on every comma, which corrupts a valid
`data:image/...;base64,... 1x` URL. A separate local compatibility patch scans
URL/descriptor boundaries linearly, sanitizes every URL, retains data-URL commas,
and leaves descriptor validity to the browser. This follows the URL tokenization
rules at https://html.spec.whatwg.org/multipage/images.html#parse-a-srcset-attribute
rather than restoring the vulnerable backtracking regex. Tests cover valid data
URLs, descriptors, rejected image sources and 100,000-character whitespace.

Three URL/SVG exploit tests failed against the pristine official npm files
whose bytes match the pinned Bower source hashes, then pass against patched
minified code. The linky DoS and Debian data-URL regression also have recorded
RED/GREEN checks. Additional real-runtime checks cover long RegExp copying,
URL input and locale currency formatting; ordinary application routes and
existing service tests remain intact.

Internet Explorer was not run and is not claimed safe. Its remaining issue is
confirmed as IE-only by the original reporter's reproduction:
https://neverendingsupport.github.io/angularjs-poc-cve-2022-25869/
AngularJS and AngularJS Material remain end of life; local reviewed fixes do not
provide ongoing upstream support or eliminate the need for future review.
