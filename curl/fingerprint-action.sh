curl https://api.scrubmytext.com/v1/actions/fingerprint \
  -H "Content-Type: application/json" \
  -d '{"action":"send_invoice","scope":"production","arguments":{"invoice_id":"inv_42","customer_id":"customer_7"}}'
