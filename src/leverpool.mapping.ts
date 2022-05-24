import { Address, BigInt } from "@graphprotocol/graph-ts";
import {
	ILeverV1Pool,
	Created,
	Deposit,
	Collect,
	Borrow,
	Repay,
	Liquidate,
} from "../generated/LeverV1Pool/ILeverV1Pool";
import {
	PoolEntity,
	DepositEntity,
	LoanEntity,
	RepayEntity,
	AccountEntity,
} from "../generated/schema";

function generateAccount(address: Address): void {
	let accountEntity = AccountEntity.load(address.toHexString());
	if (!accountEntity) {
		accountEntity = new AccountEntity(address.toHexString());
		accountEntity.address = address;

		accountEntity.save();
	}
}

export function handleCreatePool(event: Created): void {
	let pool = ILeverV1Pool.bind(event.address);

	let poolEntity = new PoolEntity(event.address.toHexString());
	poolEntity.address = event.address;
	poolEntity.created_at = event.block.timestamp;
	poolEntity.original_collection = event.params.originalCollection;
	poolEntity.collateral_coverage_rate = event.params.collaterateCoverageRatio;
	poolEntity.interest_rate = event.params.interestRate;
	poolEntity.compound_interval = event.params.compoundInterval;
	poolEntity.burn_rate = event.params.burnRate;
	poolEntity.loan_term = event.params.loanTerm;
	poolEntity.min_liquidity = event.params.minLiquduity;
	poolEntity.min_deposit = event.params.minDeposit;

	poolEntity.save();
}

export function handleDeposit(event: Deposit): void {
	let pool = ILeverV1Pool.bind(event.address);
	generateAccount(event.params.depositor);

	let depositEntity = DepositEntity.load(
		`${event.address.toHexString()}-${event.params.depositor.toHexString()}`
	);

	if (!depositEntity) {
		depositEntity = new DepositEntity(
			`${event.address.toHexString()}-${event.params.depositor.toHexString()}`
		);
		depositEntity.pool = event.address.toHexString();
		depositEntity.account = event.params.depositor.toHexString();
		depositEntity.occurred_at = event.block.timestamp;
		depositEntity.value = event.params.value;

		depositEntity.save();
	}
}

export function handleCollect(event: Collect): void {
	let pool = ILeverV1Pool.bind(event.address);
	generateAccount(event.params.collector);

	let depositEntity = DepositEntity.load(
		`${event.address.toHexString()}-${event.params.collector.toHexString()}`
	);

	if (depositEntity) {
		depositEntity.value = depositEntity.value.minus(event.params.value);
		depositEntity.save();
	}
}

export function handleBorrow(event: Borrow): void {
	let pool = ILeverV1Pool.bind(event.address);
	generateAccount(event.params.borrower);

	let loanEntity = LoanEntity.load(
		`${event.address.toHexString()}-${event.params.borrower.toHexString()}-${event.params.tokenId.toString()}`
	);

	if (!loanEntity) {
		loanEntity = new LoanEntity(
			`${event.address.toHexString()}-${event.params.borrower.toHexString()}-${event.params.tokenId.toString()}`
		);
		loanEntity.created_at = event.block.timestamp;
		loanEntity.pool = event.address.toHexString();
		loanEntity.account = event.params.borrower.toHexString();
		loanEntity.token_id = event.params.tokenId;
	}

	loanEntity.balance = event.params.value;
	loanEntity.status = "OPEN";

	loanEntity.save();
}

export function handleRepay(event: Repay): void {
	let pool = ILeverV1Pool.bind(event.address);
	generateAccount(event.params.borrower);

	let loanEntity = LoanEntity.load(
		`${event.address.toHexString()}-${event.params.borrower.toHexString()}-${event.params.tokenId.toString()}`
	);

	let repayEntity = new RepayEntity(
		`${event.address.toHexString()}-${event.params.borrower.toHexString()}-${event.params.tokenId.toString()}-${event.block.timestamp.toString()}`
	);
	repayEntity.pool = event.address.toHexString();
	repayEntity.account = event.params.borrower.toHexString();
	repayEntity.occurred_at = event.block.timestamp;
	repayEntity.value = event.params.value;
	repayEntity.token_id = event.params.tokenId;

	if (loanEntity) {
		loanEntity.balance = loanEntity.balance.minus(event.params.value);
		if (loanEntity.balance === BigInt.fromI32(0))
			loanEntity.status = "COMPLETED";
	}
}

export function handleLiquidiate(event: Liquidate): void {}
