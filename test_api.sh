echo "{ \"\": \"$(date)\" }" >> response.json
curl -sS "http://localhost:8080/slices" | jq -r '.[] | {apt_sta: .appointment.startDate, apt_end: .appointment.endDate, prt_cod: .payRateRule.code, sli_sta: .start, sli_end: .end}' >> response.json
jq '.' response.json | lolcat
