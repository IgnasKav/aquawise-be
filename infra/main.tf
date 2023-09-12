terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region  = "${var.aws_region}"
}

resource "aws_ecr_repository" "aquawise_ecr" {
  name = "aquawise_ecr"
}