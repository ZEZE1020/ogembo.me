---
title: "Calming the Storm: Building Resilient IoT Infrastructure for Precision Agriculture in Kenya"
date: 2026-07-1
event: "AWS Community Day Kenya 2026"
---

Precision agriculture platforms in Kenya must operate through unstable power, intermittent 4G connectivity, and thousands of sensors reconnecting simultaneously after an outage. These are not edge cases; they are normal operating conditions.

This session follows an architecture that failed under those conditions and the decisions, tradeoffs, and redesign that made it resilient. The result is a reusable event-driven pattern for IoT platforms operating in constrained environments.

## Architecture

- **Ingestion:** AWS IoT Core uses MQTT to protect constrained-device battery life, while Kinesis absorbs reconnection spikes without cascading compute failures.
- **Edge layer:** ESP32-class devices buffer readings locally and publish after reconnecting. AWS IoT Greengrass gateways filter data before it reaches the cloud.
- **Spatial processing:** Shapely in AWS Lambda provides spatial filtering and geofencing without dedicated GIS infrastructure.
- **Hot path:** Lambda writes live state from Kinesis to RDS PostgreSQL with PostGIS.
- **Cold path:** Firehose batches records into S3 for analysis with Athena.
- **Data residency:** The design addresses the absence of AWS IoT Core in `af-south-1` and its implications under Kenya's Data Protection Act.
- **Live simulation:** LocalStack and k6 demonstrate how synchronous ingestion collapses during a reconnection flood and how the event-driven pipeline absorbs the same load.

**Format:** 30-minute technical session  
**Level:** Intermediate to advanced  
**Demo repository:** [ZEZE1020/aws-cdk-demo](https://github.com/ZEZE1020/aws-cdk-demo)
